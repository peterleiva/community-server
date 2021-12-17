import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
	type NormalizedCacheObject,
} from "@apollo/client/core";
import fetch from "cross-fetch";
import bootstrap from "bootstrap";

function setupGraphQLServer(): ApolloClient<NormalizedCacheObject> {
	let app: { stop(): Promise<void> };
	const port = 4500;

	const link = new HttpLink({
		uri: `http://localhost:${port}/api`,
		fetch,
	});

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link: link,
	});

	beforeAll(async () => {
		app = await bootstrap({ server: { port } });
	});

	afterAll(async () => {
		await app.stop();
	});

	return client;
}

export default setupGraphQLServer;
