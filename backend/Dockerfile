# Development Stage
FROM node:20-bookworm-slim AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]

# Production Stage
FROM node:20-bookworm-slim AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=development /app ./

CMD ["node", "server.js"]