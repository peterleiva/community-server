import threads from "./threads";
import { edges, pageInfo, total } from "./thread-connection";
import { participants, post, lastActivity, replies } from "./thread";

const ThreadConnection = {
	edges,
	pageInfo,
	total,
};

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
