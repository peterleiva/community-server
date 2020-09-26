/**
 * Graphql Apollo server
 */

import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import { Router } from 'express';
import schema from './schema';

const path = '/api';

const OPTIONS: ApolloServerExpressConfig = {
  schema,
  engine: {
    reportSchema: true,
    graphVariant: 'current',
  },
};

export const server = new ApolloServer(OPTIONS);
export const middleware: Router = server.getMiddleware({ path });

export default server;
