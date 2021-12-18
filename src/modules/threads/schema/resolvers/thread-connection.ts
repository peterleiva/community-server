import type { EdgeConnection } from "lib/connection/types";
import type { IFieldResolver } from "@graphql-tools/utils";
import type { ThreadConnection } from "../typedefs";
import { type ThreadDocument, ThreadModel } from "../../thread";

export const edges: IFieldResolver<
	ThreadDocument[],
	unknown,
	unknown,
	EdgeConnection<ThreadDocument>
> = function edges(parent) {
	const edges: EdgeConnection<ThreadDocument> = parent.map(doc => ({
		cursor: doc.createdAt,
		node: doc,
	}));

	return edges;
};

export const pageInfo: IFieldResolver<
	ThreadDocument[],
	unknown,
	unknown,
	Promise<ThreadConnection["pageInfo"]>
> = async function pageInfo(source) {
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

export const total: IFieldResolver<
	unknown,
	unknown,
	unknown,
	Promise<ThreadConnection["total"]>
> = function total() {
	return ThreadModel.estimatedDocumentCount().exec();
};
