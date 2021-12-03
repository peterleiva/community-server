import threads from "./threads";
import * as ThreadConnection from "./thread-connection";
import { Thread } from "./thread";

export const resolvers = {
	Query: {
		threads,
	},
	Thread,
	ThreadConnection,
};
