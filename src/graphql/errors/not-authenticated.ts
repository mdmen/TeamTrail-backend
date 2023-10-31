import { GraphQLError } from 'graphql';

export class GraphQLNotAuthenticatedError extends GraphQLError {
  constructor() {
    super('User not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }
}
