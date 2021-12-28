import { threads, ThreadConnection } from "./threads";
import { participants, post, lastActivity, replies } from "./thread";

const Thread = {
	post,
	lastActivity,
	replies,
	participants,
};

export const resolvers = {
	Query: {
		threads,
	},
	Thread,
	ThreadConnection,
};
