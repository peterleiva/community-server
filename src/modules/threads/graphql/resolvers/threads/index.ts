import { total } from "./threads";
import type { IResolvers } from "@graphql-tools/utils";

export { threads } from "./threads";

export const ThreadConnection: IResolvers = {
	total,
};
