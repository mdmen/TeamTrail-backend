import { GraphQLError } from 'graphql';

export class GraphQLNotAuthenticatedError extends GraphQLError {
  constructor(message = 'User is not authenticated') {
    super(message, {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }
}
