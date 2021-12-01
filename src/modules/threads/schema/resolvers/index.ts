import threads from "./threads";
import * as ThreadConnection from "./thread-connection";

export const resolvers = {
	Query: {
		threads,
	},

	ThreadConnection,
};
