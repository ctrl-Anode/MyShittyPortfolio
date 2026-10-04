import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { config } from '../config/env.js';

const adapter = new PrismaMariaDb(config.DATABASE_URL);

export const prisma = new PrismaClient({
  adapter,
  log: config.isDev ? ['warn', 'error'] : ['error'],
  errorFormat: 'minimal'
});
