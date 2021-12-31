import { Cursor, PageArgs } from "modules/connection";

type Page = {
	first: number;
	after: Cursor;
};

export default function pageArgs(args: Partial<Page> = {}): PageArgs {
	return {
		page: {
			first: args?.first,
			after: args?.after,
		},
	};
}
