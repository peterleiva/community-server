import type { IFieldResolver } from "@graphql-tools/utils";
import type { ThreadDocument } from "../../thread";
import type { PageArgs, Connection, Edge } from "lib/connection/types";
import type { User } from "modules/user";
import { PostModel, type PostDocument } from "modules/post";
import Paginator from "modules/paginator";

export const participants: IFieldResolver<
	ThreadDocument,
	unknown,
	PageArgs,
	Promise<
		Connection<User> & {
			interactions: number[];
		}
	>
> = async function participants(source, args) {
	const paginate = new Paginator(args);

	const docs = await PostModel.aggregate<{
		meta: { interactions: number }[];
		page: {
			edge: Edge<User>;
			hasPrevious: boolean;
			hasNext: boolean;
		}[];
	}>()
		.match({ _id: source.op._id })
		.graphLookup({
			from: "posts",
			startWith: "$children",
			connectFromField: "children",
			connectToField: "_id",
			as: "replies",
		})
		.unwind("replies")
		.match({ "replies.createdAt": { $gt: paginate.after } })
		.group({
			_id: "$author",
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
							node: "$author",
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

		return {
			edges: page.map(p => p.edge),
			interactions: meta.flatMap(meta => meta.interactions),
			pageInfo: {
				startCursor: first.edge.cursor,
				endCursor: last.edge.cursor,
				hasNextPage: last.hasNext,
				hasPreviousPage: first.hasPrevious,
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
