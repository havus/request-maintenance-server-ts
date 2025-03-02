import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';
import { ApolloServer, } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { PostgresDataSource } from './config/typeorm';
import { WebSocketServer } from "ws";
import { useServer } from 'graphql-ws/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import './cron';

const app = express();
const port = process.env.PORT;
const httpServer = http.createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/subscriptions',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  // https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server/
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
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

console.log(`🚀 Server ready at http://0.0.0.0:${port}/graphql`);
