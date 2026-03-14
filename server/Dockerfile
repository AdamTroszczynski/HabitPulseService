FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY src/prisma ./src/prisma/
COPY prisma.config.ts ./

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build
RUN npx prisma generate --schema=src/prisma/schema.prisma

# ---- runtime ----
FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY src/prisma ./src/prisma/
COPY prisma.config.ts ./

RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy --config prisma.config.ts && node dist/src/server.js"]
