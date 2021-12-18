import type { IFieldResolver, IResolvers } from "@graphql-tools/utils";
import type { Node } from "lib/connection/types";
import type { PostDocument, Post as IPost } from "./post";
import type { UserDocument } from "./user";
import type { UserType } from "./user/graphql";

export interface PostType
	extends Node<Omit<IPost, "likedBy" | "author" | "likedBy" | "children">> {
	author: UserType;
}

const author: IFieldResolver<
	PostDocument,
	unknown,
	unknown,
	Promise<UserDocument>
> = async function author(source) {
	const { author } = await source.populate<{ author: UserDocument }>("author");
	return author;
};
export const resolvers: IResolvers<PostDocument> = {
	Post: {
		author,
	},
};
