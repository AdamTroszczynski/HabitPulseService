FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.base.json ./
COPY server/package*.json ./server/
COPY server/tsconfig.json ./server/
COPY server/src/prisma ./server/src/prisma/
COPY server/prisma.config.ts ./server/
COPY shared/ ./shared/

RUN npm ci --ignore-scripts
RUN npx prisma generate --schema=server/src/prisma/schema.prisma

COPY server/src ./server/src

RUN npm run build -w server

# ---- runtime ----
FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY server/package*.json ./server/
COPY server/src/prisma ./server/src/prisma/
COPY server/prisma.config.ts ./server/

RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/server/dist ./server/dist

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy --config server/prisma.config.ts && node server/dist/server/src/server.js"]
