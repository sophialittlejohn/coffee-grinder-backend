import * as Mutation from "./resolvers/mutations";
import * as Query from "./resolvers/queries";

import { GraphQLServer } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ rejectOnNotFound: true });

const resolvers = {
  Query,
  Mutation,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => ({
    ...request,
    prisma,
  }),
});

const options = {
  port: process.env.PORT || 4000,
  endpoint: "/graphql",
};

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
);
