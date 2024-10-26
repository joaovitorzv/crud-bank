## WooviBank

_Decisions:_

- Use mongodb driver or mongoose?
  - I'll just use the mongodb native driver to keep things simple, since mongoose is an abstraction i prefer to avoid it at least at the beggining to better understand how mongodb driver will perform

---

### Tasks

- [x] Setup repo
- [x] Setup koa, gql, typescript
- [x] add tests
- [x] Containerize app
- [x] Setup mongoDB
- [x] test mutation/query storing data
- [] setup CI/CD
- [] deploy app
- [] remove unused stuff from repo template
- [] Plan project architecture

https://docs.docker.com/guides/nodejs/configure-ci-cd/
https://www.mongodb.com/resources/products/fundamentals/examples
https://www.mongodb.com/resources/products/fundamentals/basics

### Backlog if had more time

- Observability
- Use pm2 to manage processess?

### New stuff I learned while building this

- That yarn and NPM uses different cache locations
- Build app image and compose

### References

places where I got references to build this

- https://github.com/triggerdotdev/trigger.dev
- https://github.com/woovibr/woovi-playground

### Apps and Packages

monorepo setup done with turborepo docker-starter (with some tewaks™).

- `web`: a [Next.js](https://nextjs.org/) app
- `api`: an [Koa with graphql](https://koajs.com/) server
- `@repo/ui`: a React component library
- `@repo/logger`: Isomorphic logger (a small wrapper around console.log)
- `@repo/eslint-config`: ESLint presets
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo
- `@repo/jest-presets`: Jest configurations

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Docker

This repo is configured to be built with Docker, and Docker compose. To build all apps in this repo:

```
# Install dependencies
yarn install

# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```

Open http://localhost:3000.

To shutdown all running containers:

```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```
