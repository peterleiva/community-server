import type { IFieldResolver } from "@graphql-tools/utils";
import type { PageArgs } from "lib/connection/types";
import { ThreadModel, ThreadDocument } from "../../thread";
import Paginator from "modules/paginator";

const threads: IFieldResolver<
	null,
	null,
	PageArgs,
	Promise<ThreadDocument[]>
> = async function threads(_, args) {
	const page = new Paginator(args);

	const query = ThreadModel.find({
		createdAt: { $lt: page.after },
	})
		.sort({ createdAt: -1 })
		.limit(page.limit);

	return query.exec();
};

export default threads;
