import type Page from "../page";

export default class PaginateError extends Error {
	code = "ERR_PAGINATE";

	constructor(page: Page) {
		super(`Cannot paginate page: ${page}`);
	}
}
