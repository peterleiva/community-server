import type { PageArgs, Cursor } from "./types";
import Page from "./page";

export default class CursorPage extends Page {
	#after: Cursor;

	constructor(options: PageArgs) {
		super(options);
		this.#after = options.page?.after ?? new Date();
	}

	get current(): Cursor {
		return this.#after;
	}
}
