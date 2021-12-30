import { Connection } from "modules/connection";
import toBeEdgesOfSize from "./to-be-edges-of-size";

const toHaveEmptyEdges: jest.CustomMatcher = function toHaveEmptyEdges(
	this: jest.MatcherContext,
	received: Partial<Pick<Connection<unknown>, "edges">>
) {
	return toBeEdgesOfSize.call(this, received, 0);
};

export default toHaveEmptyEdges;
