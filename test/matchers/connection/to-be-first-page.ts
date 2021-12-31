import { Connection } from "modules/connection";
import message from "./message";

const toBeFirstPage: jest.CustomMatcher = function toBeFirstPage(
	this: jest.MatcherContext,
	received: Partial<Connection<unknown>>,
	actual?: number
) {
	let pass = true;

	if (actual) {
		pass = received?.edges?.length === actual;
	}

	pass &&= received?.pageInfo?.hasPreviousPage === false;

	return {
		pass,
		message: message(
			this.isNot,
			{ edges: received?.edges?.length, pageInfo: received.pageInfo },
			{ edges: actual, pageInfo: { hasPreviousPage: false } }
		),
	};
};

export default toBeFirstPage;
