import type { GraphQLResolveInfo } from "graphql";
import { PostFactory, ThreadFactory, UserFactory } from "test/factory";
import { databaseSetup } from "test/utils";
import { participants } from "../thread";

databaseSetup();

describe("interactions resolver", () => {
	test("none when thread has no reply", async () => {
		const thread = await ThreadFactory.create();

		await expect(
			participants(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toMatchObject({ interactions: 0 });
	});

	test("original post author doesn't count", async () => {
		const replies = 4;
		const thread = await ThreadFactory.create({}, { transient: { replies } });

		await expect(
			participants(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toMatchObject({ interactions: replies });
	});

	test("authors are counted once", async () => {
		const author = await UserFactory.create();
		const replies = await PostFactory.createList(
			2,
			{},
			{ associations: { author: author._id } }
		);
		const op = await PostFactory.create(
			{},
			{
				associations: {
					author: author._id,
					children: replies.map(r => r._id),
				},
			}
		);

		const thread = await ThreadFactory.create(
			{},
			{ associations: { op: op._id } }
		);

		await expect(
			participants(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toMatchObject({ interactions: 1 });
	});

	test("count the whole orignal post subtree", async () => {
		const sublevel2 = await PostFactory.createList(2);
		const sublevel1 = await PostFactory.createList(
			2,
			{},
			{ associations: { children: sublevel2.map(r => r._id) } }
		);
		const op = await PostFactory.create(
			{},
			{ associations: { children: sublevel1.map(r => r._id) } }
		);

		const thread = await ThreadFactory.create(
			{},
			{ associations: { op: op._id } }
		);

		await expect(
			participants(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toMatchObject({ interactions: 4 });
	});
});
