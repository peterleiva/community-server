import type { IFieldResolver } from "@graphql-tools/utils";
import type { ThreadDocument } from "../../thread";
import type { PageArgs } from "lib/connection/types";
import { PostModel, Post, PostDocument } from "modules/post";
import Paginator from "modules/paginator";

export type PostParticipantResult = {
	page: Post[];
	interactions: Post[];
};

export const participants: IFieldResolver<
	ThreadDocument,
	unknown,
	PageArgs,
	Promise<PostParticipantResult>
> = async function participants(source, args) {
	const paginate = new Paginator(args);

	const participantsDoc = await PostModel.aggregate<{
		metadata: { interactions: Post[] }[];
		page: Post[];
	}>()
		.match({ _id: source.op._id })
		.graphLookup({
			from: "posts",
			startWith: "$children",
			connectFromField: "children",
			connectToField: "_id",
			as: "replies",
		})
		.facet({
			pageInfo: [
				{
					$project: {
						// startCursor: "$replies.0.updatedAt",
						// endCursor: {
						// 	$getField: { input: { $last: "$replies" }, field: "updatedAt" },
						// },
						hasNextCursor: {
							$not: {
								$size: {
									$filter: {
										input: "$replies",
										as: "reply",
										cond: { $gt: ["$$reply.updatedAt", paginate.after] },
									},
								},
							},
						},
						hasPreviousCursor: false,
					},
				},
			],
			metadata: [{ $project: { interactions: "$replies" } }],
			page: [
				{
					$unwind: {
						path: "$replies",
					},
				},
				{
					$match: {
						"replies.updatedAt": {
							$lt: paginate.after,
						},
					},
				},
				{
					$sort: { "replies.updatedAt": -1 },
				},
				{
					$limit: paginate.limit,
				},
			],
		})
		.exec();

	const result = participantsDoc.map(({ page, metadata }) => {
		return {
			page,
			interactions: metadata.flatMap(m => m.interactions),
		};
	});

	return result[0];
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
