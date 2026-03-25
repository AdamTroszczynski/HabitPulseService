import { defineConfig } from 'prisma/config';
import path from 'node:path';

process.loadEnvFile(path.resolve('../.env'));

export default defineConfig({
  schema: 'src/prisma/schema.prisma',
  migrations: {
    path: 'src/prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
