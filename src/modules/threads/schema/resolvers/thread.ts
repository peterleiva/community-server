import type { IFieldResolver } from "@graphql-tools/utils";
import { Types } from "mongoose";
import { ThreadDocument } from "../../thread";
import { PostModel, Post } from "modules/post";
import type { User } from "modules/user";

type ThreadNode = {
	id: Types.ObjectId;
	title: string;
	post: Post;
	participants: User[];
	createdAt: Date;
	updatedAt: Date;
};

async function participants(post: Types.ObjectId): Promise<User[]> {
	const pipeline = [
		{
			$match: {
				_id: post,
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
			$graphLookup: {
				from: "users",
				startWith: {
					$concatArrays: ["$replies.author", ["$author"]],
				},
				connectFromField: "_id",
				connectToField: "_id",
				maxDepth: 1,
				as: "participants",
			},
		},
		{
			$project: {
				participants: 1,
			},
		},
	];

	const result = await PostModel.aggregate<{ participants: User[] }>(
		pipeline
	).exec();

	const participants = result.flatMap(({ participants }) => participants);

	// todo: keep only distinct participants
	return participants;
}

const thread: IFieldResolver<
	ThreadDocument,
	unknown,
	unknown,
	Promise<ThreadNode>
> = async function thread(source) {
	const { _id, title, op, createdAt, updatedAt } = await source.populate<{
		op: Post;
	}>("op");

	return {
		id: _id,
		title,
		post: op,
		participants: await participants(source.op),
		createdAt,
		updatedAt,
	};
};

export default thread;
