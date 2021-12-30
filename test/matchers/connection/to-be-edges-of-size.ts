import { Connection } from "modules/connection";
import message from "./message";

const toBeEdgesOfSize: jest.CustomMatcher = function toBeEdgesOfSize(
	this: jest.MatcherContext,
	received: Partial<Pick<Connection<unknown>, "edges">>,
	actual: number
) {
	const pass = received?.edges?.length === actual;

	return {
		pass,
		message: message(
			this.isNot,
			{ edges: received?.edges?.length },
			{ edges: actual }
		),
	};
};

export default toBeEdgesOfSize;
