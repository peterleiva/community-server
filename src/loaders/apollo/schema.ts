import { gql } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
	typeDefs as scalarTypeDefs,
	resolvers as scalarResolvers,
} from "graphql-scalars";

const typeDefs = gql`
	type Query {
		noop: DateTime
	}
`;

export const schema = makeExecutableSchema({
	typeDefs: [typeDefs, ...scalarTypeDefs],
	resolvers: [scalarResolvers],
});
