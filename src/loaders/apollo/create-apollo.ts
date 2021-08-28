import { ApolloServer, GetMiddlewareOptions, gql } from "apollo-server-express";
import type { Router } from "express";
import config from "config";
import { log as logger } from "lib";
import { LoggingPlugin } from "./plugins";
import {
	ApolloServerPluginLandingPageDisabled,
	ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";

const typeDefs = gql`
	type Query {
		noop: Int
	}
`;

const landingPagePlugin = function () {
	if (config.env("development")) {
		return ApolloServerPluginLandingPageLocalDefault();
	} else {
		return ApolloServerPluginLandingPageDisabled();
	}
};

const plugins = [LoggingPlugin, landingPagePlugin()];

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
