import type { IFieldResolver } from "@graphql-tools/utils";
import { Page, type PageArgs } from "modules/connection";
import { ThreadModel, ThreadDocument } from "../../thread";

const threads: IFieldResolver<
	null,
	null,
	PageArgs,
	Promise<ThreadDocument[]>
> = async function threads(_, args) {
	const page = new Page(args);

	const query = ThreadModel.find({
		createdAt: { $lt: page.after },
	})
		.sort({ createdAt: -1 })
		.limit(page.limit);

	return query.exec();
};

export default threads;
