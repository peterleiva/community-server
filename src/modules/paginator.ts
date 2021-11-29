import type { PageArgs, Cursor } from "lib/connection/types";

export default class Pagination {
	#first: number;
	#after: Cursor;

	constructor({ page }: PageArgs) {
		this.#first = page?.first ?? 20;
		this.#after = page?.after ?? new Date();
	}

	get limit(): number {
		return this.#first;
	}

	get after(): Cursor {
		return this.#after;
	}
}