import type { PrismaClient, User } from '@prisma/client';

export interface ApolloContext {
  prisma: PrismaClient;
  user: User | null;
}
