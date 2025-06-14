import { GraphQLFormattedError } from "graphql";

export interface ILogger {
  info(graphqlError: GraphQLFormattedError): void;
}
