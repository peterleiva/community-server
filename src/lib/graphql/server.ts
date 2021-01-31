/**
 * Graphql Apollo server
 */

import { Router } from 'express';
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import schema from './schema';
import mocks from './__mocks__/schema';

export const path = '/api';

const OPTIONS: ApolloServerExpressConfig = {
  schema,
  mocks,
  // mockEntireSchema: false,
  engine: {
    reportSchema: true,
    graphVariant: 'current',
  },
};

export const server = new ApolloServer(OPTIONS);
export const middleware: Router = server.getMiddleware({ path });

export default server;
