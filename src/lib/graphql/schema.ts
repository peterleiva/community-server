/**
 * Schema top-level definition
 */

import log from 'loglevel';
import { gql, makeExecutableSchema } from 'apollo-server-express';
import { merge, flatten } from 'lodash';
import * as Scalars from 'graphql-scalars';
import { CategorySchema, TopicSchema, ReplySchema } from '../../topics';
import { UserSchema } from '../../users';
import { StatsSchema } from '../../stats';
import { ConnectionSchema, CursorResolver } from './connection';
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
    CategorySchema.typeDefs,
    TopicSchema.typeDefs,
    UserSchema.typeDefs,
    ReplySchema.typeDefs,
    StatsSchema.typeDefs,
    SortSchema.typeDefs,
    ...Scalars.typeDefs,
  ]),
  resolvers: merge(
    CategorySchema.resolvers,
    TopicSchema.resolvers,
    UserSchema.resolvers,
    ReplySchema.resolvers,
    CursorResolver,
    SortSchema.resolver,
    Scalars.resolvers
  ),
  logger: {
    log: log.error,
  },
});
