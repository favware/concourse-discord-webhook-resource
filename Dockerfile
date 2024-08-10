## Base state ##

FROM node:20-alpine3.20 AS base

WORKDIR /usr/src/app

ENV YARN_DISABLE_GIT_HOOKS=1
ENV CI=true

COPY --chown=node:node yarn.lock .
COPY --chown=node:node package.json .
COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node .yarn/ .yarn/

## Builder stage ##

FROM base AS builder

ENV NODE_ENV="development"

COPY --chown=node:node tsconfig.base.json .
COPY --chown=node:node tsup.config.ts .
COPY --chown=node:node src/ src/

RUN yarn install --immutable \
    && yarn build

## Runtime stage ##

FROM base AS runtime

ENV NODE_ENV="production"
ENV NODE_OPTIONS="--enable-source-maps"

# Copy Concourse scripts
COPY --chown=node:node ./concourse/check /opt/resource/check
COPY --chown=node:node ./concourse/in /opt/resource/in
COPY --chown=node:node ./concourse/out /opt/resource/out

# Copy NodeJS ouptut
COPY --from=builder --chown=node:node /usr/src/app/dist/ /usr/src/app/dist/

RUN yarn workspaces focus --all --production \
    && chown -R node:node /opt/resource/ \
    && chown node:node /usr/src/app/ \
    && chmod +x /opt/resource/check /opt/resource/in /opt/resource/out

USER node

CMD echo "This container is not used directly."; exit 1
