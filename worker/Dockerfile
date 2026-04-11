FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.base.json ./
COPY worker/package*.json ./worker/
COPY worker/tsconfig.json ./worker/
COPY shared/ ./shared/

RUN npm ci --ignore-scripts

COPY worker/src ./worker/src

RUN npm run build -w worker

# ---- runtime ----
FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY worker/package*.json ./worker/

RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/worker/dist ./worker/dist

CMD ["node", "worker/dist/src/worker.js"]
