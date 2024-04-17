// First experimental file, based on this post: https://snipcart.com/blog/graphql-nodejs-express-tutorial
import express from 'express';
import cors from 'cors';
import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { Client } from 'pg';
import joinMonster from 'join-monster';
import 'dotenv/config';

import { Player, Team } from './ObjectsTypes';

const client = new Client({
  host: "localhost",
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
});

client.connect();


const QueryRoot = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    players: {
      type: new GraphQLList(Player),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, (sql: string) => {
          return client.query(sql);
        })
      }
    },
    player: {
      type: Player,
      args: { id: { type: GraphQLNonNull(GraphQLInt) } },
      where: (playerTable: string, args: any) => `${playerTable}.id = ${args.id}`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, (sql: string) => {
          return client.query(sql);
        })
     }
    },
    team: {
      type: Team,
      args: { name: { type: GraphQLNonNull(GraphQLString) } },
      where: (teamTable: string, args: any) => {console.log("\n== args ==\n", args, "\n"); return `${teamTable}.name = ${args.name}`},
      resolve: (parent, args, context, resolveInfo) => {
        console.log("\n== args ==\n", args, "\n");
        return joinMonster(resolveInfo, {}, (sql: string) => {
          console.log("\n== sql ==\n", sql, "\n");
          return client.query(sql);
        })
      }
    }
  })
});

const MutationRoot = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    insertPlayer: {
      type: Player,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        first_name: { type: GraphQLNonNull(GraphQLString) },
        last_name: { type: GraphQLNonNull(GraphQLString) },
        team_id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (await client.query("INSERT INTO player (id, first_name, last_name, team_id) VALUES ($1, $2, $3, $4) RETURNING *", [args.id, args.first_name, args.last_name, args.team_id])).rows[0];
        } catch (err) {
          console.log("\n== err ==\n", err, "\n");
          throw new Error("Failed to insert new player");
        }
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});

const app = express();
app.use(cors());
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: process.env.NODE_ENV !== 'production',
}));
app.listen(4020);