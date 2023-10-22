import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { Resolvers } from '../_generated';

export const mutationResovers: Resolvers = {
  Mutation: {
    async addUser(_, args) {
      if (Math.random() > 0.5) {
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            invalidArgs: args,
          },
        });
      }

      return {
        id: '1',
        email: '0dH0K@example.com',
        nickname: 'john',
      };
    },
  },
};
