import { Connection } from "modules/connection";

const toHaveNextPage: jest.CustomMatcher = function toHaveNextPage(
	this: jest.MatcherContext,
	received: Partial<Pick<Connection<unknown>, "pageInfo">>
) {
	const pass = received?.pageInfo?.hasNextPage === true;

	const message = `
	Expected value to ${this.isNot ? "not " : ""}have pageInfo:
		${this.utils.printExpected({ pageInfo: { hasNextPage: true } })}

	Received:
		${this.utils.printReceived({ pageInfo: received["pageInfo"] })}
	`;

	const result = {
		pass,
		message: () => message,
	};

	return result;
};

export default toHaveNextPage;
