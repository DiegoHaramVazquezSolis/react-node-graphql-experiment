import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    teams: [Team!]!
    players: [Player!]!
    matches: [Match!]!
    teamByName(name: String!): Team
  }

  type Team {
    id: ID!
    name: String!
    image: String!
    players: [Player!]!
    matchesWon: [Match!]!
    matchesLost: [Match!]!
  }

  type Player {
    id: ID!
    first_name: String!
    last_name: String!
    team: Team!
  }

  type Match {
    id: ID!
    date: String!
    match_winner: Team!
    match_loser: Team!
  }

  type Mutation {
    addTeam(name: String!, image: String!): Team!
    updateTeam(id: ID!, name: String!): Team
    deleteTeam(id: ID!): Team

    addPlayer(first_name: String!, last_name: String!, team_id: ID!): Player!
    updatePlayer(id: ID!, firstName: String, lastName: String, teamId: ID): Player
    deletePlayer(id: ID!): Player

    addMatch(winnerTeamId: ID!, loserTeamId: ID!, date: String!): Match!
    updateMatch(id: ID!, winnerTeamId: ID, loserTeamId: ID, date: String): Match
    deleteMatch(id: ID!): Match
  }
`;

const resolvers = {
  Mutation: {
    addTeam: async (_: any, { name, image }: { name: string, image: string }) => {
      return await prisma.team.create({
        data: {
          name,
          image
        }
      });
    },
    updateTeam: async (_: any, { id, name }: { id: string, name: string }) => {
      return await prisma.team.update({
        where: { id },
        data: { name }
      });
    },
    deleteTeam: async (_: any, { id }: { id: string }) => {
      return await prisma.team.delete({
        where: { id }
      });
    },

    addPlayer: async (_: any, { first_name, last_name, team_id }: { first_name: string, last_name: string, team_id: string }) => {
      return await prisma.player.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          team_id
        }
      });
    },
    updatePlayer: async (_: any, { id, firstName, lastName, teamId }: {id: string, firstName: string, lastName: string, teamId: string}) => {
      return await prisma.player.update({
        where: { id },
        data: {
          first_name: firstName,
          last_name: lastName,
          team_id: teamId
        }
      });
    },
    deletePlayer: async (_: any, { id }: { id: string }) => {
      return await prisma.player.delete({
        where: { id }
      });
    },

    addMatch: async (_: any, { winnerTeamId, loserTeamId, date }: { winnerTeamId: string, loserTeamId: string, date: string }) => {
      return await prisma.match.create({
        data: {
          winner_team_id: winnerTeamId,
          loser_team_id: loserTeamId,
          date: new Date(date)
        }
      });
    },
    updateMatch: async (_: any, { id, winnerTeamId, loserTeamId, date }: { id: string, winnerTeamId: string, loserTeamId: string, date: string }) => {
      return await prisma.match.update({
        where: { id },
        data: {
          winner_team_id: winnerTeamId,
          loser_team_id: loserTeamId,
          date: date ? new Date(date) : undefined
        }
      });
    },
    deleteMatch: async (_: any, { id }: { id: string }) => {
      return await prisma.match.delete({
        where: { id }
      });
    },
  },
  Team: {
    matchesWon: async (parent: { id: string }) => await prisma.match.findMany({
      where: { winner_team_id: parent.id }
    }),
    matchesLost: async (parent: { id: string }) => await prisma.match.findMany({
      where: { loser_team_id: parent.id }
    })
  },
  Query: {
    teams: async () => await prisma.team.findMany({
      include: { players: true, match_match_winner_team_idToteam: true, match_match_loser_team_idToteam: true },
    }),
    teamByName: async (_: any, args: { name: string }) => {
      return await prisma.team.findFirst({
        where: {
          name: {
            equals: args.name
          },
        },
        include: {
          players: true,
          match_match_winner_team_idToteam: true,
          match_match_loser_team_idToteam: true,
        }
      });
    },
    players: async () => await prisma.player.findMany({
      include: { team: true },
    }),
    matches: async () => await prisma.match.findMany({
      include: { match_winner: true, match_loser: true },
    }),
  },
};


// Create an Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  const app = express();
  app.use(cors());
  await server.start();
  server.applyMiddleware({ app: app as any });

  const port = 4020;
  app.listen(port, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}

startApolloServer();