FROM oven/bun AS base

WORKDIR /usr/src/app

FROM base AS install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM base AS build
COPY . .
COPY --from=install /usr/src/app/node_modules ./node_modules
RUN bun run build

EXPOSE 7000/tcp
CMD ["bun", "run", "start"]

