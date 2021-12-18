import type { GraphQLResolveInfo } from "graphql";
import { PostFactory, ThreadFactory } from "test/factory";
import { databaseSetup } from "test/utils";
import { PostDocument } from "modules/post";
import { lastActivity } from "../thread";

databaseSetup();

describe("lastActivity resolver", () => {
	test("activity is op update date when no reply", async () => {
		const op = await PostFactory.create();
		const thread = await ThreadFactory.create(
			{},
			{ associations: { op: op._id } }
		);

		await expect(
			lastActivity(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toStrictEqual(op.updatedAt);
	});

	test("gives replies' lastest update", async () => {
		const thread = await ThreadFactory.create(
			{},
			{ transient: { replies: 2 } }
		);

		const doc = await thread.populate<{
			op: PostDocument & { children: PostDocument[] };
		}>({
			path: "op",
			populate: { path: "children" },
		});

		const reply = doc.op.children[0];
		reply.message = "updated post message";
		const { updatedAt } = await reply.save();

		await expect(
			lastActivity(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toStrictEqual(updatedAt);
	});

	test("gives last update of op if it was last updated", async () => {
		const thread = await ThreadFactory.create();
		const { op } = await thread.populate<{ op: PostDocument }>("op");

		op.message = "update message";
		const { updatedAt } = await op.save();

		await expect(
			lastActivity(thread, {}, null, {} as GraphQLResolveInfo)
		).resolves.toStrictEqual(updatedAt);
	});
});
