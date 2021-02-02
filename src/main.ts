import "reflect-metadata";
import * as path from "path";
import { buildSchema } from "type-graphql";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { ApolloServer } from "apollo-server";
import { environment } from "./environment";
import pubSub from "./pubsub";
import { InfoResolver } from "./resolvers/info";
// --------------------------------
// TODO: IMPORT YOUR RESOLVERS HERE
// --------------------------------
import { PersonResolver } from "./resolvers/person";

export interface Context {}

const bootstrap = async () => {
  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [
      InfoResolver,
      // ----------------------------
      // TODO: ADD YOU RESOLVERS HERE
      // ----------------------------
      PersonResolver,
    ],
    // ------------------------
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    pubSub,
  });

  function formatError(error: GraphQLError): GraphQLFormattedError {
    console.error(`[ERROR] ${JSON.stringify(error)}`);
    return {
      message: error.message,
      locations: error.locations,
      path: error.path,
    };
  }

  const server = new ApolloServer({
    schema,
    introspection: environment.apollo.introspection,
    playground: environment.apollo.playground,
    formatError,
  });

  // Start the server
  const { url } = await server.listen(environment.port);
  console.log(`🚀 Server ready at ${url}.`);
};

bootstrap();
