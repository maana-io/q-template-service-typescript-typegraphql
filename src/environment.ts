import { config } from "dotenv";

config();

interface Environment {
  // Identity
  serviceId: string;
  version: string;
  name: string;
  description: string;
  // Server
  port: number | string;
  // Connection
  outgoingConnectionTimeout: number;
  maxQueryResults: number;
  // Apollo
  apollo: {
    introspection: boolean;
    playground: boolean;
  };
}

export const environment: Environment = {
  // Identity
  serviceId: process.env.SERVICE_ID || "<my-service-id>",
  version: process.env.SERVICE_VERSION || "0.0.0",
  name: process.env.SERVICE_NAME || "<My Service Name>",
  description: process.env.SERVICE_DESCRIPTION || "<My service description>",
  // Server
  port: process.env.PORT || 8050,
  // Connection
  outgoingConnectionTimeout: parseInt(process.env.OUTGOING_CONNECTION_TIMEOUT!),
  maxQueryResults: parseInt(process.env.MAX_QUERY_RESULTS!),
  // Apollo
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION
      ? process.env.APOLLO_INTROSPECTION === "true"
      : true,
    playground: process.env.APOLLO_PLAYGROUND ? process.env.APOLLO_PLAYGROUND === "true" : true,
  },
};
