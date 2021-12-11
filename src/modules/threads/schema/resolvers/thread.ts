import type { IFieldResolver } from "@graphql-tools/utils";
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

export const participants: IFieldResolver<
	ThreadDocument,
	unknown,
	PageArgs,
	Promise<ParticipantsConnection>
> = async function participants(source, args) {
	const paginate = new Paginator(args);

	const docs = await PostModel.aggregate<AggregationResult>()
		.match({ _id: source.op._id })
		.graphLookup({
			from: "posts",
			startWith: "$children",
			connectFromField: "children",
			connectToField: "_id",
			as: "replies",
		})
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

export const Thread = {
	post,
	participants,
};
