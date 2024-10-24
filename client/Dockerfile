FROM oven/bun AS base

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

WORKDIR /usr/src/app

FROM base AS install
COPY package.json bun.lockb nginx.conf ./
RUN bun install --frozen-lockfile

FROM base AS build
COPY . .
COPY --from=install /usr/src/app/node_modules ./node_modules
RUN bun run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
