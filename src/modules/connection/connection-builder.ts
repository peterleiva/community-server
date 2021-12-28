import type {
	Connection,
	Edge,
	EdgeCollection,
	PageInfo,
	PageArgs,
	Cursor,
} from "./types";
import Paginator from "./paginator";
import { PaginateError } from "./errors";
import CursorPage from "./cursor-page";
import Page from "./page";

export default abstract class ConnectionBuilder<TPaged, TNode> {
	#paginator: Paginator<TPaged>;
	#results: TPaged[];
	#page: Page;

	constructor(pageArgs: PageArgs, paginator: Paginator<TPaged>) {
		this.#paginator = paginator;
		this.#results = [];
		this.#page = new CursorPage(pageArgs);
	}

	async build(): Promise<Connection<TNode>> {
		const [pageInfo, edges] = await Promise.all([
			this.pageInfo(),
			this.edges(),
		]);

		return {
			pageInfo,
			edges,
		};
	}

	abstract hasNextPage(pages?: TPaged[]): Promise<boolean>;
	abstract hasPreviousPage(pages?: TPaged[]): Promise<boolean>;
	abstract edge(data: TPaged): Promise<Edge<TNode>>;

	/**
	 * Page results, cached
	 */
	private async results(): Promise<TPaged[]> {
		this.#results ??= await this.#paginator.paginate(this.#page);

		return this.#results;
	}

	private async pageInfo(): Promise<PageInfo> {
		let results: TPaged[];
		const page = this.#page;

		try {
			results = await this.results();
		} catch (error) {
			throw new PaginateError(page);
		}

		const [startCursor, endCursor, hasNextPage, hasPreviousPage] =
			await Promise.all([
				this.startCursor(),
				this.endCursor(),
				this.hasNextPage(results),
				this.hasPreviousPage(results),
			]);

		return {
			startCursor,
			endCursor,
			hasNextPage,
			hasPreviousPage,
		};
	}

	protected async startCursor(): Promise<Cursor> {
		const results = await this.results();
		const first = await this.edge(results?.[0]);

		return first?.cursor ?? new Date();
	}

	protected async endCursor(): Promise<Cursor> {
		const results = await this.results();
		const last = await this.edge(results?.[results.length - 1]);

		return last?.cursor ?? new Date();
	}

	private async edges(): Promise<EdgeCollection<TNode>> {
		const data = await this.results();
		return Promise.all(data.map(page => this.edge(page)));
	}
}
