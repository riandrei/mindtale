# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_API_URL

RUN VITE_API_URL=${VITE_API_URL} npm run build

# Production stage
FROM nginx:alpine

# Copy the build output
COPY --from=build /app/dist /usr/share/nginx/html

# Add nginx configuration to route everything to index.html for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80