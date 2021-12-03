import type { IFieldResolver } from "@graphql-tools/utils";
import { ThreadDocument } from "../../thread";
import { PostModel, Post } from "modules/post";
import type { User } from "modules/user";
import type { PageArgs } from "lib/connection/types";
import Paginator from "modules/paginator";

const participants: IFieldResolver<
	ThreadDocument,
	unknown,
	PageArgs,
	Promise<User[]>
> = async function participants(source, args) {
	const paginate = new Paginator(args);

	const pipeline = [
		{
			$match: {
				_id: source.op,
			},
		},
		{
			$graphLookup: {
				from: "posts",
				startWith: "$_id",
				connectFromField: "children",
				connectToField: "_id",
				as: "replies",
			},
		},
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
		{
			$graphLookup: {
				from: "users",
				startWith: "$replies.author",
				connectFromField: "_id",
				connectToField: "_id",
				maxDepth: 1,
				as: "participants",
			},
		},
	];

	const result = await PostModel.aggregate<{ participants: User[] }>(
		pipeline
	).exec();

	const participants = result.flatMap(({ participants }) => participants);

	// todo: keep only distinct participants
	return participants;
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
