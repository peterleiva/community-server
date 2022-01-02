import { Connection } from "modules/connection";
import message from "./message";

const toHaveNextPage: jest.CustomMatcher = function toHaveNextPage(
	this: jest.MatcherContext,
	received: Partial<Pick<Connection<unknown>, "pageInfo">>
) {
	const pass = received?.pageInfo?.hasNextPage === true;

	const result = {
		pass,
		message: message(
			false,
			{
				pageInfo: { hasNextPage: received.pageInfo?.hasNextPage },
			},
			{ pageInfo: { hasNextPage: this.isNot } }
		),
	};

	return result;
};

export default toHaveNextPage;
