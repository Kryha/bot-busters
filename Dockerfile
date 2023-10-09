FROM node:18-alpine as build

RUN apk --no-cache add --update git python3 g++

WORKDIR /app

# RUN yarn set version 3.6.3 --only-if-needed

ENV GENERATE_SOURCEMAP false
ENV NODE_ENV production

# these are server variables and are specified in the kustomization files
# however, a placeholder value is now required for the build to succeed
ENV DATABASE_URL http://placeholder.io
ENV NEXTAUTH_SECRET server_placeholder
ENV NEXTAUTH_URL http://placeholder.io

ARG NEXT_PUBLIC_ALEO_NETWORK
ENV NEXT_PUBLIC_ALEO_NETWORK $NEXT_PUBLIC_ALEO_NETWORK

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
COPY .eslintrc.cjs ./.eslintrc.cjs

# src and public files
COPY public/ ./public/
COPY src/ ./src/

RUN yarn install --silent

RUN NODE_OPTIONS='--max-old-space-size=4096' yarn build

FROM node:18-alpine as run

RUN apk --no-cache add busybox

WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build /app/public/ ./public/
COPY --from=build /app/src/ ./src/

COPY --from=build /app/.yarn/ ./.yarn/
COPY --from=build /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=build /app/yarn.lock ./yarn.lock
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.pnp.cjs ./.pnp.cjs
COPY --from=build /app/.pnp.loader.mjs ./.pnp.loader.mjs

COPY --from=build /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=build /app/next.config.mjs ./next.config.mjs
COPY --from=build /app/tsconfig.json ./tsconfig.json

USER nextjs
EXPOSE 3000

CMD ["yarn", "start"]
