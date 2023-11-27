import type { PrismaClient } from '@prisma/client';

export interface ApolloContext {
  db: PrismaClient;
  userId: string;
}
