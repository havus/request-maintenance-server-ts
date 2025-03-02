FROM node:22-alpine AS base

WORKDIR /app

FROM base AS dependencies

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

FROM dependencies AS build

COPY . .

RUN npm run build

FROM base AS production

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

EXPOSE 4000

CMD ["npm", "start"]
