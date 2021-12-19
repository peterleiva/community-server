import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { buildServer } from "bootstrap";
import { ServerControl } from "services";
import databaseSetup from "./database-setup";
import graphqlClient from "./graphql-client";

interface BeforeHook {
	(client: ApolloClient<NormalizedCacheObject>, server: ServerControl): void;
}

interface AfterHook {
	(server: ServerControl): void;
}

type Hooks = {
	before: BeforeHook;
	after: AfterHook;
};

function setupGraphQLServer({ before, after }: Partial<Hooks> = {}): void {
	databaseSetup();

	let server: ServerControl;

	beforeAll(async () => {
		server = await buildServer();
		before?.(graphqlClient(server.port as number), server);
	});

	afterAll(async () => {
		await server.stop();
		after?.(server);
	});
}

export default setupGraphQLServer;
