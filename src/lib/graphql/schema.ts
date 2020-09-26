/**
 * Schema top-level definition
 */

import log from 'loglevel';
import { gql, makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from './scalars';
import { CategorySchema, TopicSchema } from '../../topics';

const baseTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

console.log(CategorySchema.typeDefs);
export default makeExecutableSchema({
  typeDefs: [baseTypeDefs, scalarTypeDefs],
  resolvers: merge(scalarResolvers),
  logger: {
    log: log.error,
  },
});
