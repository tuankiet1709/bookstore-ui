## Stage 1: build production dependencies
FROM node:18-alpine AS install
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps

## Stage 2: build application
FROM install AS builder
WORKDIR /app
COPY . .
RUN npm ci --legacy-peer-deps && npm run build

## Run application with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist/bookstore-ui /usr/share/nginx/html

## Start NgInx service
CMD ["nginx", "-g", "daemon off;"]
