/**
 * Schema top-level definition
 */

import log from 'loglevel';
import { gql, makeExecutableSchema } from 'apollo-server-express';
import { merge, flatten } from 'lodash';
import * as ScalarsSchema from './scalars';
import { CategorySchema, TopicSchema, ReplySchema } from '../../topics';
import { UserSchema } from '../../users';
import { StatsSchema } from '../../stats';
import { ConnectionSchema, CursorResolve } from './connection';
import * as SortSchema from './sort';

const baseTypeDefs = gql`
  type Mutation {
    _empty: Void
  }

  type Query {
    _empty: Void
  }
`;

export default makeExecutableSchema({
  typeDefs: flatten([
    baseTypeDefs,
    ConnectionSchema,
    ScalarsSchema.typeDefs,
    CategorySchema.typeDefs,
    TopicSchema.typeDefs,
    UserSchema.typeDefs,
    ReplySchema.typeDefs,
    StatsSchema.typeDefs,
    SortSchema.typeDefs,
  ]),
  resolvers: merge(
    ScalarsSchema.resolvers,
    CategorySchema.resolvers,
    TopicSchema.resolvers,
    UserSchema.resolvers,
    ReplySchema.resolvers,
    CursorResolve,
    SortSchema.resolver
  ),
  logger: {
    log: log.error,
  },
});
