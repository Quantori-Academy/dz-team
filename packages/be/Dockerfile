FROM node:20-alpine
RUN addgroup -S appuser \
    && adduser -S appuser -G appuser

USER appuser

WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
COPY tsconfig.json /
EXPOSE 1337
CMD [ "yarn", "dev" ]
