import type { PageArgs } from "lib/connection/types";
import type { IFieldResolver } from "@graphql-tools/utils";
import { ThreadModel, Thread } from "../../thread";
import Paginator from "../../../paginator";

const threads: IFieldResolver<
	never,
	never,
	PageArgs,
	Promise<Thread[]>
> = async (_, args): Promise<Thread[]> => {
	const page = new Paginator(args);

	const query = ThreadModel.find({
		createdAt: { $lt: page.after },
	})
		.sort({ createdAt: 1 })
		.limit(page.limit);

	return query.exec();
};

export default threads;
