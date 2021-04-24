# Coffee Grinder Backend

The backend exposes a GraphQL API built with Prisma.

# Database & Datamodels

The (only) Postgres database is hosted at [heroku databse](https://dashboard.heroku.com/apps/coffee-grindr/resources)

# Development Setup

```bash
yarn && yarn dev
```

# Deployment

The backend is also deployed at [heroku web app](https://dashboard.heroku.com/apps/coffee-grindr).

The deployment relies on docker and the heroku cli. Therefore both need to be installed to deploy.

The Dockerfile will copy and install all of the resources necessary to deploy.

First, build a docker image

```bash
yarn docker:build
```

To verify if the build was successful, run the following command. Then visit http://localhost:4000 and make sure you can access the GraphQL playground

```bash
yarn docker:start
```

Next step is to push the docker image to the heroku docker registry.

```bash
yarn docker:push
```

Finally, release the newly pushed image.

```bash
yarn docker:deploy
```
