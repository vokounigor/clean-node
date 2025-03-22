FROM node:22-alpine AS base

FROM base AS builder

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY .env.sample .env

RUN npm prune --production
CMD ["node", "dist/index.js"]
