import { resolvers } from "../resolvers";

describe("Connection resolvers", () => {
	test("parseValue return base64 encoding from date", () => {
		const cursor = new Date();
		const serialized = Buffer.from("" + cursor.getTime()).toString("base64");

		expect(resolvers.Cursor.parseValue(serialized)).toEqual(cursor);
	});
});
