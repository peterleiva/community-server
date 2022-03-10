import type { IResolvers, IFieldResolver } from "@graphql-tools/utils";
import type { ObjectId } from "mongoose";
import type { UserDocument } from "../schema";
import type { UserType } from "./types";

const avatar: IFieldResolver<UserDocument, unknown, unknown, string> =
	function avatar() {
		return "https://picsum.photos/100/100";
	};

export const resolvers: IResolvers<UserDocument, unknown, unknown, UserType> = {
	User: {
		avatar,
		id(source): ObjectId {
			return source._id;
		},
	},
};
