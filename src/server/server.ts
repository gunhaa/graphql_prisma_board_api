import { ApolloServer } from '@apollo/server';
import express, { Application, Request, Response } from 'express';
import { GraphQLFormattedError } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import http from 'http';
import { config } from '../config/config';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from '../graphql/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { Context, createContext } from '../context/context';
import { CreateServerResult } from '../graphql/types/createServerResult';
import { errorLogger } from '../log/logger';

const createApolloServer = async (): Promise<CreateServerResult> => {
  const app: Application = express();
  const httpServer = http.createServer(app);

  const graphqlErrorHandling = (e: GraphQLFormattedError) => {
    console.error('Server error: ', e);
    errorLogger.info(e);
    return {
      message:
        e.message ||
        '예상치 못한 서버 내부 오류입니다. 잠시 후 다시 시도해 주세요.',
      code: e.extensions?.code || 'INTERNAL_SERVER_ERROR',
    };
  };

  const apolloServer = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      config.PROJECT_TYPE === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault({ embed: false }),
    ],
    formatError: graphqlErrorHandling,
    validationRules: [depthLimit(10)],
    introspection: config.PROJECT_TYPE === 'production' ? false : true,
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json({ limit: '10mb' }),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<Context> => {
        return createContext();
      },
    })
  );

  app.all('*', (_: Request, res: Response) => {
    res.send('BOLD9 Assignment Server, Use /graphql endpoint.');
  });

  return {
    express: app,
    apolloServer: apolloServer,
    httpServer: httpServer,
  };
};

export default createApolloServer;
