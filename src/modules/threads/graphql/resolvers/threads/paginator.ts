import { ThreadDocument, ThreadModel } from "../../thread";
import type { Paginator, Page } from "modules/connection";

export default class ThreadsPaginator implements Paginator<ThreadDocument> {
	paginate(page: Page): Promise<ThreadDocument[]> {
		const query = ThreadModel.find({
			createdAt: { $lt: page.current },
		})
			.sort({ createdAt: -1 })
			.limit(page.limit);

		return query.exec();
	}
}
