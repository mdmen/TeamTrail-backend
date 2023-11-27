import type { Resolvers } from '../_generated';
import { GraphQLNotFoundError } from '../errors';
import { UserCreateInputSchema } from '../../prisma/_generated/zod';
import { handleGraphQLError } from '../../helpers/errors';

export const userResolvers: Resolvers = {
  Query: {
    me: async (_, __, { userId, db }) => {
      const me = await db.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!me) {
        throw new GraphQLNotFoundError();
      }

      return me;
    },
  },
  Mutation: {
    async createUser(_, { input }, { db }) {
      try {
        const user = await db.user.create({
          data: UserCreateInputSchema.parse(input),
        });

        return user;
      } catch (err) {
        handleGraphQLError(err);
      }
    },
  },
};
