# Stage 1: Build Angular app
FROM node:22 AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@10.2.0
RUN npm install

COPY . .

RUN npm run build -- --configuration=development
RUN rm -rf node_modules

# Stage 2: Serve with NGINX
FROM nginx:alpine AS production-stage

COPY --from=build-stage /app/dist/teleauro-customer-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost || exit 1
