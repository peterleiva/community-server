import type { GraphQLResolveInfo } from "graphql";
import { ThreadFactory, PostFactory } from "test/factory";
import { databaseSetup } from "test/utils";
import { PostModel } from "modules/post";
import { post, participants } from "../thread";

databaseSetup();

describe("Thread Type resolvers", () => {
	test("post resolve return thread's original post document", async () => {
		const op = await PostFactory.create();
		const thread = await ThreadFactory.create(
			{},
			{ associations: { op: op._id } }
		);

		const result = await post(thread, null, null, {} as GraphQLResolveInfo);

		expect(result).toBeInstanceOf(PostModel);
		expect(result._id).toStrictEqual(op._id);
	});

	describe("participants resolver", () => {
		describe("pageInfo", () => {
			test.todo("information about the page");
		});

		test("original post direct replies", async () => {
			const thread = await ThreadFactory.create(
				{},
				{ transient: { replies: 5 } }
			);

			const result = await participants(
				thread,
				{},
				null,
				{} as GraphQLResolveInfo
			);

			expect(result.interactions).toBe(5);
		});

		test("all deeply nested replies", async () => {
			const reply3 = await PostFactory.create();
			const reply2 = await PostFactory.create(
				{},
				{ associations: { children: [reply3._id] } }
			);
			const reply1 = await PostFactory.create(
				{},
				{ associations: { children: [reply2._id] } }
			);

			const op = await PostFactory.create(
				{},
				{ associations: { children: [reply1._id] } }
			);

			const thread = await ThreadFactory.create(
				{},
				{ associations: { op: op._id } }
			);

			const posts = [reply1._id, reply2._id, reply3._id];

			await expect(
				participants(thread, {}, null, {} as GraphQLResolveInfo)
			).resolves.toMatchObject({
				interactions: posts.length,
			});
		});
	});
});
