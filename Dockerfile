FROM node:20-alpine AS build

WORKDIR /app

COPY . .

RUN yarn --frozen-lockfile

RUN yarn build

# Deploy Frontend
FROM nginx:alpine AS fe

COPY --chown=node:node --from=build /app/packages/fe/dist /usr/share/nginx/html

EXPOSE 80

# Deploy Backend
FROM node:20-alpine AS be

WORKDIR /app/packages/be

COPY --from=build /app/packages/be/dist ./dist

COPY --from=build /app/packages/be/package.json .

COPY --from=build app/packages/be/prisma ./prisma/

RUN yarn

EXPOSE 1337

CMD ["yarn", "prod"]
