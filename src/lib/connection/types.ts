export type Avatar = string;
export type Cursor = string;

export type Connection<T> = {
	edges: Edge<T>[];
	pageInfo: PageInfo;
};

export type PageInfo = {
	startCursor: Cursor;
	endCursor: Cursor;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
};

export type Edge<T> = {
	cursor: Cursor;
	node: T;
};

export type Timestamps = {
	createdAt: Date;
	updatedAt: Date;
};

export type ForwardPagination = {
	first: number;
	after: Cursor;
};

export type BackwardPagination = {
	last: number;
	before: Cursor;
};