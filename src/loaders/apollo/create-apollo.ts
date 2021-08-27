import { ApolloServer, GetMiddlewareOptions, gql } from "apollo-server-express";
import type { Router } from "express";
import config from "config";
import { log as logger } from "lib";
import { LoggingPlugin } from "./plugins";

const typeDefs = gql`
	type Query {
		noop: Int
	}
`;

const plugins = [LoggingPlugin];

export default async function createApollo(
	options: GetMiddlewareOptions = {}
): Promise<Router> {
	const server = new ApolloServer({
		typeDefs,
		mocks: !config.env("production", "staging"),
		logger,
		plugins,
	});

	await server.start();

	return server.getMiddleware(options);
}
