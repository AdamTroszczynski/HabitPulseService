import 'dotenv/config';
import { defineConfig } from 'prisma/config';
import { env } from './src/helpers/ConfigEnv';

export default defineConfig({
  schema: 'src/prisma/schema.prisma',
  migrations: {
    path: 'src/prisma/migrations',
  },
  datasource: {
    url: env.DATABASE_URL,
  },
});
