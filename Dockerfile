FROM node:20-alpine AS build

WORKDIR /app

COPY . .

RUN yarn

RUN yarn workspace be build

CMD ["node", "/app/packages/be/dist/index.js"]
