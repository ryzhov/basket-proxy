ARG expose_port
FROM node:alpine

WORKDIR /build
COPY . .
RUN npm ci
RUN npm run build && cp -r dist /app
RUN rm -rf * .??*

ENV NODE_ENV=production
WORKDIR /app
RUN npm ci
EXPOSE ${expose_port}
CMD [ "node", "-r", "dotenv/config", "server.js" ]
