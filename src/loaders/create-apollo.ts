import { ApolloServer, GetMiddlewareOptions, gql } from "apollo-server-express";
import type { Router } from "express";
import config from "config";

const typeDefs = gql`
	type Query {
		noop: Int
	}
`;

export default async function createApollo(
	options: GetMiddlewareOptions = {}
): Promise<Router> {
	const server = new ApolloServer({
		typeDefs,
		mocks: !config.env("production", "staging"),
	});

	await server.start();

	return server.getMiddleware(options);
}
