FROM oven/bun AS base


RUN bun i -g serve

FROM base AS install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM base AS build
COPY . .
COPY --from=install /usr/src/app/node_modules ./node_modules
RUN bun run build

FROM nginx:alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

