import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import type { Resolvers } from '../_generated';

export const userResolvers: Resolvers = {
  Query: {
    me: (_, __, { user }) => user,
    users: async (_, { workspace }) => {
      return [
        {
          id: 'asd',
          nickname: 'test' + workspace,
          email: 'dasd@dasd.ru',
        },
      ];
    },
  },
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
  User: {},
};
