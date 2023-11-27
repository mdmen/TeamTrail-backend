import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

export class GraphQLInternalError extends GraphQLError {
  constructor(message = 'Internal server error') {
    super(message, {
      extensions: {
        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
        http: { status: 500 },
      },
    });
  }
}
