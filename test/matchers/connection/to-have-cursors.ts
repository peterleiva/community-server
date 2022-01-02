import { Connection, Cursor } from "modules/connection";
import message from "./message";

type Cursors = {
	startCursor?: Cursor;
	endCursor?: Cursor;
};

const toHaveCursors: jest.CustomMatcher = function toHaveCursors(
	this: jest.MatcherContext,
	received: Partial<Pick<Connection<unknown>, "pageInfo">>,
	{ startCursor, endCursor }: Cursors
) {
	let pass = true;

	if (startCursor) {
		pass &&= received.pageInfo?.startCursor === startCursor;
	}

	if (endCursor) {
		pass &&= received.pageInfo?.endCursor === endCursor;
	}

	return {
		pass,
		message: message(
			this.isNot,
			{ pageInfo: received.pageInfo },
			{ pageInfo: { startCursor, endCursor } }
		),
	};
};

export default toHaveCursors;
