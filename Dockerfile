FROM node:20-alpine as build

RUN apk --no-cache add --update git python3 g++

WORKDIR /app

ENV GENERATE_SOURCEMAP false
ENV NODE_ENV production

ENV SKIP_ENV_VALIDATION true

ARG NEXT_PUBLIC_ALEO_NETWORK
ENV NEXT_PUBLIC_ALEO_NETWORK $NEXT_PUBLIC_ALEO_NETWORK

ARG NEXT_PUBLIC_WS_URL
ENV NEXT_PUBLIC_WS_URL $NEXT_PUBLIC_WS_URL

# package files
COPY .yarn/ ./.yarn/
COPY .yarnrc.yml ./.yarnrc.yml
COPY yarn.lock ./yarn.lock
COPY package.json ./package.json
COPY .pnp.cjs ./.pnp.cjs
COPY .pnp.loader.mjs ./.pnp.loader.mjs

# config files
COPY drizzle.config.ts ./drizzle.config.ts
COPY next.config.mjs ./next.config.mjs
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.server.json ./tsconfig.server.json
COPY .eslintrc.cjs ./.eslintrc.cjs

# migrations
COPY migrations/ ./migrations/

# src and public files
COPY public/ ./public/
COPY src/ ./src/

RUN yarn install --silent

RUN yarn build

FROM node:20-alpine as run

RUN apk --no-cache add busybox

WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/dist/ ./dist/
COPY --from=build --chown=nextjs:nodejs /app/public/ ./public/
COPY --from=build --chown=nextjs:nodejs /app/src/ ./src/
COPY --from=build --chown=nextjs:nodejs /app/migrations/ ./migrations/

COPY --from=build --chown=nextjs:nodejs /app/.yarn/ ./.yarn/
COPY --from=build --chown=nextjs:nodejs /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=build --chown=nextjs:nodejs /app/yarn.lock ./yarn.lock
COPY --from=build --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=build --chown=nextjs:nodejs /app/.pnp.cjs ./.pnp.cjs
COPY --from=build --chown=nextjs:nodejs /app/.pnp.loader.mjs ./.pnp.loader.mjs

COPY --from=build --chown=nextjs:nodejs /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=build --chown=nextjs:nodejs /app/next.config.mjs ./next.config.mjs
COPY --from=build --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json
COPY --from=build --chown=nextjs:nodejs /app/tsconfig.server.json ./tsconfig.server.json

USER nextjs

EXPOSE 3000

CMD ["yarn", "start:prod"]
