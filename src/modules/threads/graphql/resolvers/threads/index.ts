import type { IResolvers } from "@graphql-tools/utils";
import { total, threads } from "./resolvers";

const ThreadConnection: IResolvers = {
	total,
};

export { threads, ThreadConnection };
