/**
 * Schema top-level definition
 */

import log from 'loglevel';
import { gql, makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';
import * as ScalarsSchema from './scalars';
import { CategorySchema, TopicSchema, ReplySchema } from '../../topics';
import { UserSchema } from '../../users';
import ConnectionSchema from './connection.schema';

const baseTypeDefs = gql`
  type Mutation {
    _empty: Void
  }

  type Query {
    _empty: Void
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    baseTypeDefs,
    ConnectionSchema,
    ScalarsSchema.typeDefs,
    CategorySchema.typeDefs,
    TopicSchema.typeDefs,
    UserSchema.typeDefs,
    ReplySchema.typeDefs,
  ],
  resolvers: merge(
    ScalarsSchema.resolvers,
    CategorySchema.resolvers,
    TopicSchema.resolvers,
    UserSchema.resolvers,
    ReplySchema.resolvers
  ),
  logger: {
    log: log.error,
  },
});
