import { defineConfig } from 'prisma/config';

if (!process.env.DATABASE_URL) {
  await import('dotenv/config');
}

export default defineConfig({
  schema: 'src/prisma/schema.prisma',
  migrations: {
    path: 'src/prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
