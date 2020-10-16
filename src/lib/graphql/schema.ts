/**
 * Schema top-level definition
 */

import log from 'loglevel';
import { gql, makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';
import * as ScalarsSchema from './scalars';
import { CategorySchema, TopicSchema, ReplySchema } from '../../topics';
import { UserSchema } from '../../users';

const baseTypeDefs = gql`
  type Mutation {
    _empty: Void
  }

  type Query {
    _empty: Void
  }

	interface Connection {
		totalCount: Int!;
		edges: [EdgeConnection!]!
		pageInfo: PageInfo!
	}

	interface EdgeConnection {
		node: NodeConnection
		cursor: Base64!
		friendshipTime: DateTime!
	}

	interface NodeConnection {
		name: String!
	}

	interface PageInfo {
		endCursor: Base64!
		startCursor: Base64!
		hasNextPage: Boolean!
	}
`;

export default makeExecutableSchema({
  typeDefs: [
    baseTypeDefs,
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
