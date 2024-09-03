FROM node:20-alpine AS build

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

CMD ["yarn", "prod"]
