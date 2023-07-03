###### Install dependencies only when needed ######
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build


######  Use NgInx alpine image  ######
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN chown -R nginx:nginx /etc/nginx/nginx.conf \
  && chown -R nginx:nginx /usr/share/nginx/html \
  && chmod -R 755 /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html

# Start NgInx service
CMD ["nginx", "-g", "daemon off;"]
