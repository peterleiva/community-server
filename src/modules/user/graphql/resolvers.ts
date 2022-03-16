import type { Resolvers } from "types/schema";

export const resolvers: Resolvers = {
	User: {
		avatar() {
			return "https://picsum.photos/100/100";
		},

		id(source) {
			return source._id;
		},
	},
};
