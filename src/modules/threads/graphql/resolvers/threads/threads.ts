import type { IFieldResolver, IResolvers } from "@graphql-tools/utils";
import { Connection, type PageArgs, Page } from "modules/connection";
import { type ThreadDocument, ThreadModel } from "modules/threads";
import ConnectionBuilder from "./connection-builder";

async function paginator(page: Page): Promise<ThreadDocument[]> {
	const query = ThreadModel.find({
		createdAt: { $lt: page.current },
	})
		.sort({ createdAt: -1 })
		.limit(page.limit);

	return await query.exec();
}

export const threads: IFieldResolver<
	null,
	null,
	PageArgs,
	Promise<Connection<ThreadDocument>>
> = async function threads(_, args) {
	const builder = new ConnectionBuilder(args, paginator);

	return builder.build();
};

export const ThreadConnection: IResolvers<Connection<ThreadDocument>> = {
	total(): Promise<number> {
		return ThreadModel.estimatedDocumentCount().exec();
	},
};
