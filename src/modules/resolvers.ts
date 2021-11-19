import type {
	PageArgs,
	Connection,
	EdgeConnection,
} from "lib/connection/types";
import type { IFieldResolver } from "@graphql-tools/utils";
import { ThreadModel, Thread } from "./thread";
import { log } from "lib";

const ThreadConnection: IFieldResolver<
	Thread[],
	never,
	never,
	Promise<Connection<Thread>>
> = async (parent): Promise<Connection<Thread>> => {
	const edges: EdgeConnection<Thread> = parent.map(doc => ({
		cursor: doc.id,
		node: doc,
	}));

	const pageInfo = {
		startCursor: edges[0].cursor,
		endCursor: edges[edges.length - 1].cursor,
		hasNextPage: false,
		hasPreviousPage: false,
	};

	return {
		edges,
		pageInfo,
	};
};

const threads: IFieldResolver<
	never,
	never,
	PageArgs,
	Promise<Thread[]>
> = async (_, { page }): Promise<Thread[]> => {
	const query = ThreadModel.find({ _id: { $lt: page?.after } })
		.sort({ _id: 1 })
		.limit(page?.first ?? 20);

	log.info("query threads guy");
	return query.exec();
};

const ForwardPaginationInput = (): void => {
	log.debug("forwardn pagination");
};

export const resolvers = {
	Query: {
		threads,
	},

	ThreadConnection,
	ForwardPaginationInput,
};
