import { GraphQLError } from 'graphql';

export class GraphQLNotFoundError extends GraphQLError {
  constructor(message = 'Resource is not found') {
    super(message, {
      extensions: {
        code: 'NOT_FOUND',
        http: { status: 404 },
      },
    });
  }
}
