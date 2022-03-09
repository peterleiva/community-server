import { gql } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
	typeDefs as scalarTypeDefs,
	resolvers as scalarResolvers,
} from "graphql-scalars";
import * as Connection from "modules/connection";
import { schema as threads } from "modules/threads";
import { schema as users } from "modules/user";
import { resolvers } from "modules/resolvers";
import baseTypes from "./typedefs.graphql";

const root = gql`
	schema {
		query: Query
	}

	type Query
`;

export const schema = makeExecutableSchema({
	typeDefs: [
		root,
		baseTypes,
		Connection.typeDefs,
		threads.typeDefs,
		users.typeDefs,
		...scalarTypeDefs,
	],
	resolvers: [
		resolvers,
		scalarResolvers,
		Connection.resolvers,
		users.resolvers,
		threads.resolvers,
	],
});
