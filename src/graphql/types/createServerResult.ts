import { ApolloServer } from "@apollo/server";
import { Application } from "express";
import { Context } from "../../context/context";
import http from 'http';

export type CreateServerResult = {
  express: Application;
  apolloServer: ApolloServer<Context>;
  httpServer: http.Server;
};
