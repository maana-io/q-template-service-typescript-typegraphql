import { config } from "dotenv";

config();

interface Environment {
  apollo: {
    introspection: boolean;
    playground: boolean;
  };
  port: number | string;
  serviceId: string;
  version: string;
  outgoingConnectionTimeout: number;
  maxQueryResults: number;
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION
      ? process.env.APOLLO_INTROSPECTION === "true"
      : true,
    playground: process.env.APOLLO_PLAYGROUND ? process.env.APOLLO_PLAYGROUND === "true" : true,
  },
  port: process.env.PORT || 8080,
  serviceId: process.env.SERVICE_ID || "maana-my-service",
  version: process.env.VERSION || "0.0.0",
  outgoingConnectionTimeout: parseInt(process.env.OUTGOING_CONNECTION_TIMEOUT!),
  maxQueryResults: parseInt(process.env.MAX_QUERY_RESULTS!),
};
