import { Connection } from "modules/connection";
import message from "./message";

const toMatchNodes: jest.CustomMatcher = function toMatchNodes(
	this: jest.MatcherContext,
	received: Partial<Pick<Connection<unknown>, "edges">>,
	actual: unknown[]
) {
	const { edges } = received;
	const nodes = edges?.map(edge => edge?.node) ?? [];

	// check each nodes of actual and test its subset for equality with received
	const pass = actual.reduce<boolean>(
		(prev, current, index) =>
			prev && (this.utils.subsetEquality(nodes?.[index], current) ?? false),
		true
	);

	return {
		pass,
		message: message(this.isNot, { nodes }, { nodes: actual }),
	};
};

export default toMatchNodes;
