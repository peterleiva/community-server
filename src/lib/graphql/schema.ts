/**
 * Schema top-level definition
 */

import log from 'loglevel';
import { gql, makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';
import { CategorySchema, TopicSchema } from '../../topics';

const baseTypes = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export default makeExecutableSchema({
  typeDefs: [baseTypes, CategorySchema.typeDefs, TopicSchema.typeDefs],
  resolvers: merge(CategorySchema.resolvers, TopicSchema.resolvers),
  logger: {
    log: log.error,
  },
});
