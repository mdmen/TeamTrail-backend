import type { PrismaClient } from '@prisma/client';

export interface ApolloContext {
  prisma: PrismaClient;
}
