import { GraphQLServer } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";

import * as Query from "./resolvers/queries";
import * as Mutation from "./resolvers/mutations";

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
};

server.start(options, ({ port }) =>
    console.log(
        `Server started, listening on port ${port} for incoming requests.`,
    ),
)