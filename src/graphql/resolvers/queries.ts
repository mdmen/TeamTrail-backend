import { Resolvers } from '../_generated';

export const queryResolvers: Resolvers = {
  Query: {
    users: async (_, { limit }) => {
      return [
        {
          id: 'asd',
          nickname: 'test' + limit,
          email: 'dasd@dasd.ru',
        },
      ];
    },
  },
};
