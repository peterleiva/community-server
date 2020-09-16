/**
 * Schema top-level definition
 */

import { gql, makeExecutableSchema } from 'apollo-server-express';
import log from 'loglevel';

const baseTypes = gql`
  type Query {
    empty: String
  }
`;

export default makeExecutableSchema({
  typeDefs: baseTypes,
  logger: {
    log: log.error,
  },
});
