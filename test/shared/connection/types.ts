import type { Connection, EdgeCollection, PageArgs } from "modules/connection";

export interface Factory {
	(size: number): Promise<EdgeCollection<unknown>>;
}
export interface Resolver {
	(pageArgs?: PageArgs): Promise<Connection<unknown>>;
}
