import { ConnectionBuilder as Builder, Edge, Page } from "modules/connection";
import { ThreadDocument, ThreadModel } from "modules/threads";

export default class ConnectionBuilder extends Builder<
	ThreadDocument,
	ThreadDocument
> {
	async edge(thread: ThreadDocument): Promise<Edge<ThreadDocument>> {
		return {
			cursor: thread.createdAt,
			node: thread,
		};
	}

	async hasNextPage(): Promise<boolean> {
		const endCursor = await this.endCursor();

		const hasNextPage = await ThreadModel.findOne({
			createdAt: { $lt: endCursor },
		}).exec();

		return !!hasNextPage;
	}

	async hasPreviousPage({
		page,
	}: {
		page: Page;
		results: ThreadDocument[];
	}): Promise<boolean> {
		const hasPreviousPage = await ThreadModel.findOne({
			createdAt: { $gte: page.current },
		}).exec();

		return !!hasPreviousPage;
	}
}
