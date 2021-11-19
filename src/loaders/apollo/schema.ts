import { gql } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
	typeDefs as scalarTypeDefs,
	resolvers as scalarResolvers,
} from "graphql-scalars";
import typeDefs from "./typedefs";
import { schema as threadSchema } from "modules/threads";

const root = gql`
	schema {
		query: Query
	}

	type Query
`;

export const schema = makeExecutableSchema({
	typeDefs: [root, typeDefs, threadSchema.typeDefs, ...scalarTypeDefs],
	resolvers: [scalarResolvers, threadSchema.resolvers],
});
