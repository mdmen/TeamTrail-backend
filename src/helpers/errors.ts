import { z } from 'zod';
import { GraphQLInternalError, GraphQLBadInputError } from '../graphql/errors';

export function handleGraphQLError(err: unknown): never {
  if (err instanceof z.ZodError) {
    const { message } = err.issues[0];
    throw new GraphQLBadInputError(message);
  }

  throw new GraphQLInternalError();
}
