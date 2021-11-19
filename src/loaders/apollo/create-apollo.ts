import { ApolloServer, GetMiddlewareOptions } from "apollo-server-express";
import type { Router } from "express";
import {
	ApolloServerPluginLandingPageDisabled,
	ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import config from "config";
import { log as logger } from "lib";
import { LoggingPlugin } from "./plugins";
import { schema } from "./schema";
import { mocks as scalarMocks } from "graphql-scalars";
import { addMocksToSchema } from "@graphql-tools/mock";
import { mocks } from "./mocks";
import { resolvers } from "modules/resolvers";

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
		schema: config.env("production", "staging")
			? schema
			: addMocksToSchema({
					schema,
					preserveResolvers: true,
					mocks: {
						...scalarMocks,
						...mocks,
					},
			  }),
		resolvers,
		logger,
		plugins,
	});

	await server.start();

	return server.getMiddleware(options);
}
