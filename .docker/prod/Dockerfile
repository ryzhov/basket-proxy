# ---- BUILD IMAGE ----
FROM node:alpine AS builder

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# ---- PROD IMAGE ----
FROM node:alpine

ARG EXPOSE_PORT
ARG GIT_HASH
ENV NODE_ENV=production

WORKDIR /var/www

COPY --from=builder /app/package.json /app/package-lock.json /app/.env ./
COPY --from=builder /app/dist ./dist

RUN echo "GIT_HASH=${GIT_HASH}" >> .env && npm ci

EXPOSE ${expose_port}

CMD [ "npm", "run", "start" ]
