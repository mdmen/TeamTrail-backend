import { envSchema } from '../env';

export const isProduction = envSchema.NODE_ENV === 'production';
