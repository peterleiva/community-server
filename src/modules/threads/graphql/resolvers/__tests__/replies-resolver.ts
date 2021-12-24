import type { GraphQLResolveInfo } from "graphql";
import { PostFactory, ThreadFactory } from "test/factory";
import { databaseSetup } from "test/utils";
import { replies } from "../thread";

databaseSetup();

describe("replies resolver", () => {
	test("number of post's op subtree", async () => {
		const sublevel2 = await PostFactory.createList(2);
		const sublevel1 = await PostFactory.create(
			{},
			{ associations: { children: sublevel2.map(p => p._id) } }
		);

		const op = await PostFactory.create(
			{},
			{ associations: { children: [sublevel1._id] } }
		);

		const thread = await ThreadFactory.create(
			{},
			{ associations: { op: op._id } }
		);

		await expect(
			replies(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toBe(3);
	});

	test("no reply when op has no interaction", async () => {
		const thread = await ThreadFactory.create();

		await expect(
			replies(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toBe(0);
	});
});
