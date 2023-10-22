import { loadFilesSync } from '@graphql-tools/load-files';
import { ApolloServer } from '@apollo/server';
import { queryResolvers, mutationResovers, entityResovers } from './resolvers';
import { type ApolloContext } from './context';

export const apolloServer = new ApolloServer<ApolloContext>({
  typeDefs: loadFilesSync(`${__dirname}/**/*.graphql`),
  resolvers: {
    ...queryResolvers,
    ...mutationResovers,
    ...entityResovers,
  },
  includeStacktraceInErrorResponses: false,
});
