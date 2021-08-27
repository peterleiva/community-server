import { ApolloServer, GetMiddlewareOptions, gql } from "apollo-server-express";
import type { Router } from "express";
import config from "config";
import { log as logger } from "lib";

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
		mocks: !(config.env("production") || config.env("staging")),
		logger,
	});

	await server.start();

	return server.getMiddleware(options);
}
