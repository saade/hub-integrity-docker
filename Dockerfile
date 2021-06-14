FROM node:15-alpine3.10
WORKDIR /app
COPY . .
RUN npm install

ENTRYPOINT ["node", "index.js"]