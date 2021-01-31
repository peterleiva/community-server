/**
 * Schema top-level definition
 */

import log from 'loglevel';
import { gql, makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';
import * as ScalarsSchema from './scalars';
import { CategorySchema, TopicSchema, ReplySchema } from '../../topics';
import { UserSchema } from '../../users';
import { StatsSchema } from '../../stats';
import connectionSchema from './connection.schema';

const baseTypeDefs = gql`
  type Mutation {
    _empty: Void
  }

  type Query {
    _empty: Void
  }

  """
   Sort enumerates all possible ways to sort a attribute type. Any field can be
  ordered in ascending or descending orders.
  """
  enum Sort {
    ASC
    DESC
  }
  """
  Sort input is used by queries to order a list of results by some of its field.
  The query can even include a list of sort input to order they after other.
  """
  input SortInput {
    field: String!
    order: Sort!
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    baseTypeDefs,
    connectionSchema,
    ScalarsSchema.typeDefs,
    CategorySchema.typeDefs,
    TopicSchema.typeDefs,
    UserSchema.typeDefs,
    ReplySchema.typeDefs,
    StatsSchema.typeDefs,
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
