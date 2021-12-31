import type { IFieldResolver } from "@graphql-tools/utils";
import { Connection, type PageArgs, Page } from "modules/connection";
import { type ThreadDocument, ThreadModel } from "../../../thread";
import ConnectionBuilder from "./connection-builder";

function paginator(page: Page): Promise<ThreadDocument[]> {
	const query = ThreadModel.find({
		createdAt: { $lt: page.current },
	})
		.sort({ createdAt: -1 })
		.limit(page.limit);

	return query.exec();
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

export const total: IFieldResolver<
	null,
	null,
	PageArgs,
	Promise<number>
> = async function total() {
	return ThreadModel.estimatedDocumentCount().exec();
};
