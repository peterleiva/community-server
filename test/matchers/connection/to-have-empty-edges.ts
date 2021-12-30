import { Connection } from "modules/connection";
import message from "./message";

const toHaveEmptyEdges: jest.CustomMatcher = function toHaveEmptyEdges(
	this: jest.MatcherContext,
	received: Partial<Pick<Connection<unknown>, "edges">>
) {
	const pass = received?.edges?.length === 0;

	return {
		pass,
		message: message(this.isNot, { edges: received.edges }, { edges: [] }),
	};
};

export default toHaveEmptyEdges;
