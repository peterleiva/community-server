import type { IResolvers } from "@graphql-tools/utils";
import type { UserDocument } from "../schema";
import { UserType } from "./typedefs";

export const resolvers: IResolvers<UserDocument, unknown, unknown, UserType> = {
	// User(source) {
	// 	return {
	// 		...source,
	// 		id: source._id,
	// 		avatar: "https://linktoavatar",
	// 	};
	// },
};
