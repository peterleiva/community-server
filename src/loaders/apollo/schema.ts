import { gql } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
	typeDefs as scalarTypeDefs,
	resolvers as scalarResolvers,
} from "graphql-scalars";
import typeDefs from "./typedefs";
import { schema as threads } from "modules/threads";
import { schema as users } from "modules/user";
import { resolvers } from "modules/resolvers";

const root = gql`
	schema {
		query: Query
	}

	type Query
`;

export const schema = makeExecutableSchema({
	typeDefs: [
		root,
		typeDefs,
		threads.typeDefs,
		users.typeDefs,
		...scalarTypeDefs,
	],
	resolvers: [scalarResolvers, users.resolvers, threads.resolvers],
});
