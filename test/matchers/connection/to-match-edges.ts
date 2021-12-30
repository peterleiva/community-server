import { Connection, EdgeCollection } from "modules/connection";
import message from "./message";

const toMatchEdges: jest.CustomMatcher = function toMatchEdges(
	this: jest.MatcherContext,
	received: Partial<Pick<Connection<unknown>, "edges">>,
	actual: EdgeCollection<unknown>
) {
	const { edges } = received;

	// check each edge of actual and test its subset for equality with received
	const pass = actual.reduce(
		(prev, current, index) =>
			prev && (this.utils.subsetEquality(edges?.[index], current) ?? false),
		true
	);

	return {
		pass,
		message: message(this.isNot, { edges }, { edges: actual }),
	};
};

export default toMatchEdges;
