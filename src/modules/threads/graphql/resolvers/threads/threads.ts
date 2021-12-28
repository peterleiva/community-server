import type { IFieldResolver, IResolvers } from "@graphql-tools/utils";
import { Connection, type PageArgs } from "modules/connection";
import { type ThreadDocument, ThreadModel } from "modules/threads";
import ConnectionBuilder from "./connection-builder";
import Paginator from "./paginator";

export const threads: IFieldResolver<
	null,
	null,
	PageArgs,
	Promise<Connection<ThreadDocument>>
> = async function threads(_, args) {
	const paginator = new Paginator();
	const builder = new ConnectionBuilder(args, paginator);

	return builder.build();
};

export const ThreadConnection: IResolvers<Connection<ThreadDocument>> = {
	total(): Promise<number> {
		return ThreadModel.estimatedDocumentCount().exec();
	},
};
