import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

export class GraphQLBadInputError extends GraphQLError {
  constructor(message = 'Bad user input') {
    super(message, {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
        http: { status: 400 },
      },
    });
  }
}
