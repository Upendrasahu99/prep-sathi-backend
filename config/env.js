import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  // Only load local env files when not in production.
  config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
}

export const {
  PORT, 
  NODE_ENV, 
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRE_IN,
  ARJECT_KEY,
  ARJECT_ENV
} = process.env;