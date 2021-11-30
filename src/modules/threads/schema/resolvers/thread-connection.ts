import type { EdgeConnection, PageInfo } from "lib/connection/types";
import type { IFieldResolver } from "@graphql-tools/utils";
import { Thread, ThreadModel } from "../../thread";

const edges: IFieldResolver<Thread[], never, never, EdgeConnection<Thread>> = (
	parent
): EdgeConnection<Thread> => {
	const edges: EdgeConnection<Thread> = parent.map(doc => ({
		cursor: doc.createdAt,
		node: doc,
	}));

	return edges;
};

const pageInfo: IFieldResolver<
	Thread[],
	never,
	never,
	Promise<PageInfo>
> = async (source): Promise<PageInfo> => {
	const startCursor = source[0]?.createdAt ?? new Date();
	const endCursor = source?.[source.length - 1]?.createdAt ?? new Date();

	const hasPreviousPage = !!(await ThreadModel.findOne({
		createdAt: { $gt: startCursor },
	}).exec());

	const hasNextPage = !!(await ThreadModel.findOne({
		createdAt: { $lt: endCursor },
	}).exec());

	return {
		startCursor,
		endCursor,
		hasNextPage,
		hasPreviousPage,
	};
};

const total: IFieldResolver<never, never, never, Promise<number>> = () => {
	return ThreadModel.estimatedDocumentCount().exec();
};

export default {
	edges,
	pageInfo,
	total,
};
