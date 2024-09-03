FROM node:20-alpine AS build

WORKDIR /app

COPY . .

RUN yarn

RUN yarn workspace be build

# deploy fe
# COPY packages/fe/dist /app/packages/fe/dist

# deploy be
COPY packages/be/dist /app/packages/be/dist

COPY node_modules /app/node_modules
COPY packages/be/node_modules /app/packages/be/node_modules


CMD ["node", "packages/be/dist/index.js"]
