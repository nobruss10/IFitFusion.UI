FROM node:14 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:production

FROM httpd:alpine3.15

COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/
