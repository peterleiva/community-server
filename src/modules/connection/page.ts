import type { PageArgs, Cursor } from "./types";
import { NonNegativeArgument } from "lib/errors";

export default abstract class Page {
	static DEFAULT_SIZE = 20;
	#first: number;

	constructor({ page }: Omit<PageArgs, "after">) {
		this.#first = page?.first ?? Page.DEFAULT_SIZE;

		if (this.#first < 0) {
			throw new NonNegativeArgument("first", this.#first);
		}
	}

	get limit(): number {
		return this.#first;
	}

	abstract get current(): Cursor;
}
