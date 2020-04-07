FROM node:alpine

ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
RUN rm -rf * .??*

WORKDIR /app/dist
RUN npm ci --only=production
EXPOSE $EXPOSE_PORT
CMD [ "node", "-r", "dotenv/config", "server.js" ]
