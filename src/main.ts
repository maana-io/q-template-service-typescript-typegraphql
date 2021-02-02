import { GraphQLError, GraphQLFormattedError } from "graphql";

import { ApolloServer } from "apollo-server";
import { environment } from "./environment";
import infoSchema from "./schemas/info";
import personSchema from "./schemas/person";
import { resolvers } from "./resolvers";

type Maybe<T> = T | null;

export interface Context {}

function formatError(error: GraphQLError): GraphQLFormattedError {
  console.error(`[ERROR] ${JSON.stringify(error)}`);
  return {
    message: error.message,
    locations: error.locations,
    path: error.path
  };
}

const server = new ApolloServer({
  resolvers: resolvers as any,
  typeDefs: [personSchema, infoSchema],
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  formatError
});

server.listen(environment.port).then(({ url }) => console.log(`Server ready at ${url}. `));
