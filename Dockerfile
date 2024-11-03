FROM node:20-alpine AS be

WORKDIR /app

COPY . .

RUN yarn --frozen-lockfile

RUN yarn workspace be prisma generate

RUN yarn build

EXPOSE 1337

CMD ["yarn", "init:be"]

# Deploy Frontend
FROM nginx:alpine AS fe

COPY --chown=node:node --from=be /app/packages/fe/dist /usr/share/nginx/html

EXPOSE 80
