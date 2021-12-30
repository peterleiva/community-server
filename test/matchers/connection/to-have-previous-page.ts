import { Connection } from "modules/connection";
import message from "./message";

const toHavePreviousPage: jest.CustomMatcher = function toHavePreviousPage(
	this: jest.MatcherContext,
	received: Partial<Pick<Connection<unknown>, "pageInfo">>
) {
	const pass = received?.pageInfo?.hasPreviousPage === true;

	return {
		pass,
		message: message(
			true,
			{ pageInfo: received?.pageInfo },
			{ pageInfo: { hasPreviousPage: !this.isNot } }
		),
	};
};

export default toHavePreviousPage;
