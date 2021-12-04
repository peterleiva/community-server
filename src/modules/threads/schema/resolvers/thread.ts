import type { IFieldResolver } from "@graphql-tools/utils";
import type { ThreadDocument } from "../../thread";
import type { PageArgs } from "lib/connection/types";
import { PostModel, Post } from "modules/post";
import Paginator from "modules/paginator";

export type PostParticipantResult = {
	page: Post[];
	iteractions: Post[];
};

const participants: IFieldResolver<
	ThreadDocument,
	unknown,
	PageArgs,
	Promise<PostParticipantResult>
> = async function participants(source, args) {
	const paginate = new Paginator(args);
	const result = await PostModel.aggregate<{
		page: Post[];
		metadata: { interactions: Post[] };
	}>()
		.match({ _id: source.op })
		.graphLookup({
			from: "posts",
			startWith: "$_id",
			connectFromField: "children",
			connectToField: "_id",
			as: "replies",
		})
		.facet({
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
							$gt: paginate.after,
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

	const {
		page,
		metadata: { interactions },
	} = result;

	return {
		page,
		interactions,
	};
};

const post: IFieldResolver<
	ThreadDocument,
	unknown,
	unknown,
	Promise<Post>
> = async function (source) {
	const { op: post } = await source.populate<{ op: Post }>("op");
	return post;
};

export const Thread = {
	post,
	participants,
};
