import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	type NormalizedCacheObject,
} from "@apollo/client/core";
import fetch from "cross-fetch";

export default function graphqlClient(
	port: number
): ApolloClient<NormalizedCacheObject> {
	const link = new HttpLink({
		uri: `http://localhost:${port}/api`,
		fetch,
	});

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link,
	});

	return client;
}
