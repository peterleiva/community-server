import threads from "./threads";
import ThreadConnection from "./thread-connection";

export const resolvers = {
	Query: {
		threads,
	},

	ThreadConnection,
};
