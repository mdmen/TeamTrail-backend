import { startStandaloneServer } from '@apollo/server/standalone';
import { apolloServer } from './graphql/server';
import { prisma } from './prisma/client';
import { envSchema } from './env';

startStandaloneServer(apolloServer, {
  context: async () => ({ prisma }),
  listen: { port: envSchema.GRAPHQL_PORT },
}).then(({ url }) => {
  console.log(`Apollo server ready at ${url}`);
});
