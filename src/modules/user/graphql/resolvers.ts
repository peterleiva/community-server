import type { IResolvers, IFieldResolver } from "@graphql-tools/utils";
import type { UserDocument } from "../schema";
import { UserType } from "./typedefs";

const avatar: IFieldResolver<UserDocument, unknown, unknown, string> =
	function avatar() {
		return "https://picsum.photos/100/100";
	};

export const resolvers: IResolvers<UserDocument, unknown, unknown, UserType> = {
	User: {
		avatar,
	},
};
