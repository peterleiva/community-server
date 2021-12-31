/// <reference types="jest" />
/// <reference types="modules/connection/types" />

declare namespace jest {
	interface Matchers<R> {
		toHaveNextPage(): R;
		toHavePreviousPage(): R;
		toMatchPageInfo(pageInfo: Partial<PageInfo>): R;
		/**
		 * check if edges is empty array
		 */
		toHaveEmptyEdges(): R;
		/**
		 * check the length of edges object
		 * @param size edges length
		 */
		toBeEdgesOfSize(size: number): R;
		/**
		 * match edges object list
		 * @param edges
		 */
		toMatchEdges(edges: Partial<EdgeConnection<unknown>>): R;
		/**
		 * match list of nodes
		 * @param edges
		 */
		toMatchNodes(nodes: unknown[]): R;
		/**
		 * check if has property of the first page with optional size
		 * @param size
		 */
		toBeFirstPage(size?: number): R;
	}
}
