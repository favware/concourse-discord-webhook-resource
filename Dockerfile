## Base state ##

FROM node:20-alpine3.20 AS base

WORKDIR /usr/src/app

ENV YARN_DISABLE_GIT_HOOKS=1
ENV CI=true

RUN set -ex \
    && apk add --no-cache dumb-init ca-certificates

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .
COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node .yarn/ .yarn/

COPY --chown=node:node ./concourse/check /assets/check
COPY --chown=node:node ./concourse/in /assets/in
COPY --chown=node:node ./concourse/out /assets/out

RUN yarn install --immutable

ENTRYPOINT ["dumb-init", "--"]

## Builder stage ##

FROM base AS builder

COPY --from=base --chown=node:node /usr/src/app/node_modules/ /usr/src/app/node_modules/

COPY --chown=node:node tsconfig.base.json .
COPY --chown=node:node tsup.config.ts .
COPY --chown=node:node src/ src/

RUN yarn build

## Runtime stage ##

FROM base AS runtime

ENV NODE_ENV="production"
ENV NODE_OPTIONS="--enable-source-maps"

# Create a directory for Concourse scripts
RUN mkdir -p /opt/resource

# Copy Concourse scripts
COPY --from=base /assets/check /opt/resource/
COPY --from=base /assets/in /opt/resource/
COPY --from=base /assets/out /opt/resource/

# Copy NodeJS scripts
COPY --from=base --chown=node:node /usr/src/app/node_modules/ /usr/src/app/node_modules/
COPY --from=builder --chown=node:node /usr/src/app/dist/ /usr/src/app/dist/

USER node

CMD echo "This container is not used directly."; exit 1
