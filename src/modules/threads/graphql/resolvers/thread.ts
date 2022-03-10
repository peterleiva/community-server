import type { IFieldResolver } from "@graphql-tools/utils";
import type { Types, Aggregate } from "mongoose";
import type { ThreadDocument } from "modules/threads";
import type { UserType } from "modules/user/graphql";
import type { ThreadType } from "../types";
import { CursorPage, type PageArgs, type Edge } from "modules/connection";
import { PostModel, type PostDocument } from "modules/post";

type AggregationResult = {
	meta: { interactions: number }[];
	page: {
		edge: Edge<UserType>;
		hasPrevious: boolean;
		hasNext: boolean;
	}[];
};

function buildRepliesAggregate<R>(op: Types.ObjectId): Aggregate<Array<R>> {
	return PostModel.aggregate<R>().match({ _id: op }).graphLookup({
		from: "posts",
		startWith: "$children",
		connectFromField: "children",
		connectToField: "_id",
		as: "replies",
	});
}

export const participants: IFieldResolver<
	ThreadDocument,
	unknown,
	PageArgs,
	Promise<ThreadType["participants"]>
> = async function participants(source, args) {
	const page = new CursorPage(args);

	const docs = await buildRepliesAggregate<AggregationResult>(source.op._id)
		.unwind("replies")
		.group({
			_id: "$replies.author",
			cursor: { $min: "$replies.createdAt" },
		})
		.facet({
			meta: [
				{
					$count: "interactions",
				},
			],
			page: [
				{
					$sort: { cursor: 1 },
				},
				{
					$limit: page.limit,
				},
				{
					$lookup: {
						from: "users",
						localField: "_id",
						foreignField: "_id",
						as: "author",
					},
				},
				{
					$project: {
						edge: {
							node: { $arrayElemAt: ["$author", 0] },
							cursor: "$cursor",
						},
						hasPrevious: { $lt: [page.current, "$cursor"] },
						hasNext: { $gt: [page.current, "$cursor"] },
					},
				},
			],
		})
		.exec();

	const postsParticipants = docs.map(async ({ page, meta }) => {
		const first = page[0];
		const last = page[page.length - 1];
		const [interactions = 0] = meta.flatMap(meta => meta.interactions);
		const edges = page.map(({ edge }) => edge);

		return {
			edges,
			interactions,
			pageInfo: {
				startCursor: first?.edge?.cursor ?? new Date(),
				endCursor: last?.edge?.cursor ?? new Date(),
				hasNextPage: last?.hasNext ?? false,
				hasPreviousPage: first?.hasPrevious ?? false,
			},
		};
	});

	const [result] = await Promise.all(postsParticipants);

	return result;
};

export const post: IFieldResolver<
	ThreadDocument,
	unknown,
	unknown,
	Promise<PostDocument>
> = async function post(source) {
	const { op } = await source.populate<{ op: PostDocument }>("op");
	return op;
};

export const lastActivity: IFieldResolver<
	ThreadDocument,
	unknown,
	unknown,
	Promise<ThreadType["lastActivity"]>
> = async function lastActivity(source) {
	const docs = await buildRepliesAggregate<{ activity: Date }>(
		source.op._id
	).project({
		activity: {
			$max: {
				$concatArrays: [["$updatedAt"], "$replies.updatedAt"],
			},
		},
	});

	const [{ activity }] = docs;

	return activity;
};

export const replies: IFieldResolver<
	ThreadDocument,
	unknown,
	unknown,
	Promise<ThreadType["replies"]>
> = async function replies(source) {
	const docs = await buildRepliesAggregate<{
		replies: number;
	}>(source.op._id).project({ replies: { $size: "$replies" } });

	const [{ replies }] = docs;

	return replies;
};
