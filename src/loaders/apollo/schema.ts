import { makeExecutableSchema } from "@graphql-tools/schema";
import {
	typeDefs as scalarTypeDefs,
	resolvers as scalarResolvers,
} from "graphql-scalars";
import * as Connection from "modules/connection";
import { schema as threads } from "modules/threads";
import { schema as users } from "modules/user";
import { resolvers } from "modules/resolvers";
import baseTypes from "./base.graphql";
import root from "./root.graphql";

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
