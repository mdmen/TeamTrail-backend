import z from 'zod';

const schema = z.object({
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]),
  GRAPHQL_PORT: z.number().min(1).max(65535),
});

const parsed = schema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  GRAPHQL_PORT: Number(process.env.GRAPHQL_PORT),
});

if (!parsed.success) {
  console.error(parsed.error.issues);
  throw Error('There is an error with the environment variables');
}

export const envSchema = parsed.data;
