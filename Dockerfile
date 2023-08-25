FROM httpd:alpine3.15 AS runner
WORKDIR /usr/local/apache2/htdocs/

ARG APP_ENVIRONMENT

ENV NODE_ENV ${APP_ENVIRONMENT}

COPY ./dist /usr/local/apache2/htdocs/
