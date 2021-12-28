import { Types } from "mongoose";

export type Cursor = Date;

export type Node = {
	id: Types.ObjectId;
};

export type Edge<T> = {
	cursor: Cursor;
	node: T;
};

export type EdgeCollection<T> = Edge<T>[];

export type Connection<T> = {
	edges: EdgeCollection<T>;
	pageInfo: PageInfo;
};

export type PageInfo = {
	startCursor: Cursor;
	endCursor: Cursor;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
};

export type EdgeConnection<T> = Edge<T>[];

export type ForwardPagination = {
	first: number;
	after: Cursor;
};

export type BackwardPagination = {
	last: number;
	before: Cursor;
};

export type PageArgs<
	T extends ForwardPagination | BackwardPagination = ForwardPagination
> = {
	page?: Partial<T>;
};
