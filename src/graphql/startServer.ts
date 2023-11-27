import { loadFilesSync } from '@graphql-tools/load-files';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { resolvers } from './resolvers';
import { prisma } from '../prisma/client';
import { type ApolloContext } from './context';
// import { GraphQLNotAuthenticatedError } from './errors';
// import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { isProduction } from '../helpers/utils';

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
        isProduction && (process.env.WEB_SITE_URL as string),
      ],
      credentials: true,
    }),
    // ClerkExpressWithAuth(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async () => {
        // const userId = req?.auth?.userId;

        // if (!userId) {
        //   throw new GraphQLNotAuthenticatedError();
        // }

        return { db: prisma, userId: '' };
      },
    }),
  );

  const port = Number(process.env.SERVER_API_PORT);
  const path = process.env.SERVER_API_PATH;

  await new Promise<void>((resolve) =>
    httpServer.listen({ port, path }, resolve),
  );

  console.log(`🚀 Server ready at http://localhost:${port}${path}`);
}
