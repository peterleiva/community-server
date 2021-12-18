import type { IFieldResolver, IResolvers } from "@graphql-tools/utils";
import type { PageArgs, Node, Connection } from "lib/connection/types";
import type { PostDocument, Post as IPost } from "./post";
import type { UserDocument } from "./user";
import type { UserType } from "./user/graphql";

export interface PostType
	extends Node<Omit<IPost, "likedBy" | "author" | "likedBy" | "children">> {
	author: UserType;
	replies: PostRepliesConnection;
}

export type PostRepliesConnection = Connection<PostType>;

// const PostRepliesConnection: IFieldResolver<
// 	PostDocument,
// 	unknown,
// 	PageArgs,
// 	Promise<PostRepliesConnection>
// > = function PostRepliesConnection(source) {};

export const resolvers: IResolvers<PostDocument> = {
	async Post(source): Promise<PostDocument> {
		const post = await source.populate<{ author: UserDocument }>("author");
		return post;
	},
	// PostRepliesConnection,
};
