import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { GraphQLContext } from './types/context';
import { PostgresDataSource } from './config/typeorm';
import './cron';

const app = express();
const port = process.env.PORT;
const httpServer = http.createServer(app);

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
  // https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server/
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

PostgresDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error: any) => {
    console.error('Error during Data Source initialization:', error);
  });

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }: { req: express.Request }) => ({ token: req.headers.token }),
  }),
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port }, resolve),
);

console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
