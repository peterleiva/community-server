import type { IFieldResolver } from "@graphql-tools/utils";
import type { Types, Aggregate } from "mongoose";
import type { ThreadDocument } from "../../thread";
import type { PageArgs, Connection, Edge } from "lib/connection/types";
import type { User } from "modules/user";
import { PostModel, type PostDocument } from "modules/post";
import Paginator from "modules/paginator";

type AggregationResult = {
	meta: { interactions: number }[];
	page: {
		edge: Edge<User>;
		hasPrevious: boolean;
		hasNext: boolean;
	}[];
};

interface ParticipantsConnection extends Connection<User> {
	interactions: number;
}

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
	Promise<ParticipantsConnection>
> = async function participants(source, args) {
	const paginate = new Paginator(args);

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
					$limit: paginate.limit,
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
						hasPrevious: { $lt: [paginate.after, "$cursor"] },
						hasNext: { $gt: [paginate.after, "$cursor"] },
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
> = async function (source) {
	const { op } = await source.populate<{ op: PostDocument }>("op");
	return op;
};

export const lastActivity: IFieldResolver<
	ThreadDocument,
	unknown,
	unknown,
	Promise<Date>
> = async function (source) {
	const docs = await buildRepliesAggregate<{
		_id: Types.ObjectId;
		lastActivity: Date;
	}>(source.op._id).project({
		lastActivity: {
			$max: {
				$concatArrays: [["$updatedAt"], "$replies.updatedAt"],
			},
		},
	});

	const [{ lastActivity }] = docs;

	return lastActivity;
};

export const replies: IFieldResolver<
	ThreadDocument,
	unknown,
	unknown,
	Promise<number>
> = async function (source) {
	const docs = await buildRepliesAggregate<{
		replies: number;
	}>(source.op._id).project({ replies: { $size: "$replies" } });

	const [{ replies }] = docs;

	return replies;
};

export const Thread = {
	post,
	participants,
	lastActivity,
	replies,
};
