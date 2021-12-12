import type { GraphQLResolveInfo } from "graphql";
import { PostFactory, ThreadFactory, UserFactory } from "factory";
import { databaseSetup } from "utils";
import { participants } from "../thread";

databaseSetup();

describe("Post's participants edges resolver", () => {
	test("node is replies' authors", async () => {
		const author = await UserFactory.create();
		const thread = await ThreadFactory.create(
			{},
			{ transient: { replies: 3, replyAuthor: author } }
		);

		await expect(
			participants(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toMatchObject({
			edges: [
				{
					node: { _id: author._id },
				},
			],
		});
	});

	test("edge is empty when no reply", async () => {
		const thread = await ThreadFactory.create();

		await expect(
			participants(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toMatchObject({
			edges: [],
		});
	});

	test("cursor is oldest author's post creation date", async () => {
		const author = await UserFactory.create();
		const newestReply = await PostFactory.create(
			{},
			{ associations: { author: author._id } }
		);
		const reply = await PostFactory.create(
			{},
			{ associations: { author: author._id } }
		);

		const op = await PostFactory.create(
			{},
			{ associations: { children: [newestReply._id, reply._id] } }
		);

		const thread = await ThreadFactory.create(
			{},
			{ associations: { op: op._id } }
		);

		await expect(
			participants(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toMatchObject({
			edges: [
				{
					cursor: newestReply.createdAt,
				},
			],
		});
	});

	test("node gives whole authors subtree", async () => {
		const reply2 = await PostFactory.create();
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

		await expect(
			participants(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toMatchObject({
			edges: [
				{
					node: reply2.author._id,
					cursor: reply2.createdAt,
				},
				{
					node: reply1.author._id,
					cursor: reply1.createdAt,
				},
			],
		});
	});

	test("node gives unique users", async () => {
		const author = await UserFactory.create();
		const thread = await ThreadFactory.create(
			{},
			{ transient: { replyAuthor: author, replies: 2 } }
		);

		await expect(
			participants(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toMatchObject({
			edges: [{ node: author._id }],
		});
	});
});
