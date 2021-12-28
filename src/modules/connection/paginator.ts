import Page from "./page";

export default interface Paginator<TPaged> {
	paginate(page: Page): Promise<TPaged[]>;
}
