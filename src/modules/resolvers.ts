import type { IFieldResolver, IResolvers } from "@graphql-tools/utils";
import type { Node } from "modules/connection";
import type { PostDocument, Post as IPost } from "./post";
import type { UserDocument } from "./user";
import type { UserType } from "./user/graphql";

export interface PostType
	extends Node<Omit<IPost, "likedBy" | "author" | "likedBy" | "children">> {
	author: UserType;
	likes: number;
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

const likes: IFieldResolver<PostDocument, unknown, unknown, PostType["likes"]> =
	function likes(source) {
		return source.likedBy.length;
	};

export const resolvers: IResolvers<PostDocument> = {
	Post: {
		author,
		likes,
	},
};
