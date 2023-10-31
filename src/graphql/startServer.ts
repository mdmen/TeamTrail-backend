import { loadFilesSync } from '@graphql-tools/load-files';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { resolvers } from './resolvers';
import { prisma } from '../prisma/client';
import { type ApolloContext } from './context';
import { GraphQLNotAuthenticatedError } from './errors';

export async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer<ApolloContext>({
    typeDefs: loadFilesSync(`${__dirname}/**/*.graphql`),
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    includeStacktraceInErrorResponses: false,
  });

  await apolloServer.start();

  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: [
        'https://sandbox.embed.apollographql.com',
        'https://studio.apollographql.com',
      ],
      credentials: true,
    }),
    ClerkExpressWithAuth(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        const { auth } = req;

        if (!auth?.userId) {
          throw new GraphQLNotAuthenticatedError();
        }

        const user = await prisma.user.findUnique({
          where: {
            id: auth.userId,
          },
        });

        return { prisma, user };
      },
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen(
      {
        port: Number(process.env.SERVER_API_PORT),
        path: process.env.SERVER_API_PATH,
      },
      resolve,
    ),
  );

  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}
