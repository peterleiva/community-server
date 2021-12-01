import type { PageArgs, Cursor } from "lib/connection/types";
import { NonNegativeArgument } from "lib";

export default class Pagination {
	#first: number;
	#after: Cursor;

	constructor({ page }: PageArgs) {
		this.#first = page?.first ?? 20;
		this.#after = page?.after ?? new Date();

		if (this.#first < 0) {
			throw new NonNegativeArgument("first", this.#first);
		}
	}

	get limit(): number {
		return this.#first;
	}

	get after(): Cursor {
		return this.#after;
	}
}
