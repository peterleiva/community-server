import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { QueryOptionsFactory, ThreadFactory, PostFactory } from "test/factory";
import { setupGraphQLServer } from "test/utils";
import { PostDocument } from "modules/post";
import { UserDocument } from "modules/user";

describe("threads query", () => {
	const options = QueryOptionsFactory.build();
	let client: ApolloClient<NormalizedCacheObject>;

	setupGraphQLServer({
		before: graphql => {
			client = graphql;
		},
	});

	test("empty result when no thread", async () => {
		const { data } = await client.query(options);

		expect(data).toMatchObject({
			threads: {
				total: 0,
				edges: [],
			},
		});
	});

	test("query threads type", async () => {
		const replies = await PostFactory.createList(2);
		const op = await PostFactory.create(
			{},
			{ associations: { children: replies.map(r => r._id) } }
		);

		const thread = await ThreadFactory.create({ op: op._id });
		const doc = await thread.populate<{ op: PostDocument }>("op");
		const participants = (
			await Promise.all(
				replies.map(r => r.populate<{ author: UserDocument }>("author"))
			)
		).map(r => r.author);

		await expect(client.query(options)).resolves.toMatchObject({
			data: {
				threads: {
					edges: [
						{
							node: {
								id: doc._id,
								title: doc.title,
								lastActivity: op.updatedAt.toISOString(),
								replies: replies.length,
								post: {
									id: op._id,
									message: op.message,
									author: {
										id: op.author._id,
									},
								},

								participants: {
									edges: participants.map(user => ({
										node: { id: user._id },
									})),
									interactions: replies.length,
								},
							},
						},
					],
					total: 1,
				},
			},
		});
	});

	test.todo("no replies gives no participants and no replies");
	test.todo("count whole replies subtree");
	test.todo("returns whole likes");
});
