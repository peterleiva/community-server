import type { IFieldResolver } from "@graphql-tools/utils";
import { CursorPage, type PageArgs } from "modules/connection";
import { ThreadModel, ThreadDocument } from "../../thread";

const threads: IFieldResolver<
	null,
	null,
	PageArgs,
	Promise<ThreadDocument[]>
> = async function threads(_, args) {
	const page = new CursorPage(args);

	const query = ThreadModel.find({
		createdAt: { $lt: page.current },
	})
		.sort({ createdAt: -1 })
		.limit(page.limit);

	return query.exec();
};

export default threads;
