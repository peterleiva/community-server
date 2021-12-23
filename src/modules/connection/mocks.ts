import type { IResolvers } from "@graphql-tools/utils";
import type { Cursor } from "./types";

export const mocks: IResolvers = {
	Cursor: (): Cursor => new Date(),
};
