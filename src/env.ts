import z from 'zod';

const schema = z.object({
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]),
  SERVER_API_PORT: z.number().min(1).max(65535),
});

const parsed = schema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  SERVER_API_PORT: Number(process.env.SERVER_API_PORT),
});

if (!parsed.success) {
  console.error(parsed.error.issues);
  throw Error('There is an error with the environment variables');
}

export const envSchema = parsed.data;
