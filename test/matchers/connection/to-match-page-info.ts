import { Connection, PageInfo } from "modules/connection";
import message from "./message";

const toMatchPageInfo: jest.CustomMatcher = function toMatchPageInfo(
	this: jest.MatcherContext,
	received: Partial<Pick<Connection<unknown>, "pageInfo">>,
	actual: Partial<PageInfo>
) {
	const pageInfo = received?.pageInfo;

	const pass = this.utils.subsetEquality(pageInfo, actual) ?? false;

	return {
		pass,
		message: message(this.isNot, { pageInfo }, { pageInfo: actual }),
	};
};

export default toMatchPageInfo;
