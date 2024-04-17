import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';

const Player: GraphQLObjectType = new GraphQLObjectType({
  name: 'Player',
  extensions: {
    joinMonster: {
      sqlTable: 'player',
      uniqueKey: 'id',
    }
  },
  fields: () => ({
    id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    team: {
      type: Team,
      extensions: {
        joinMonster: {
          sqlJoin: (playerTable: string, teamTable: string) => `${playerTable}.team_id = ${teamTable}.id`
        }
      },
    }
  })
});

const Team: GraphQLObjectType = new GraphQLObjectType({
  name: 'Team',
  extensions: {
    joinMonster: {
      sqlTable: 'team',
      uniqueKey: 'id'
    }
  },
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    players: {
      type: GraphQLList(Player),
      extensions: {
        joinMonster: {
          sqlJoin: (teamTable: string, playerTable: string) => `${teamTable}.id = ${playerTable}.team_id`
        }
      },
   }
  })
});

export {
  Player,
  Team,
};