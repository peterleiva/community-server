import { QueryOptionsFactory, ThreadFactory } from "test/factory";
import { setupGraphQLServer } from "test/utils";
import { PostDocument } from "modules/post";
import { ThreadDocument } from "modules/threads";
import { ThreadType } from "modules/threads/schema";
import { UserType } from "modules/user/graphql";

async function mountResult(
	thread: ThreadDocument
): Promise<Partial<ThreadType>> {
	const {
		_id: id,
		title,
		createdAt,
		updatedAt,
		op,
	} = await thread.populate<{
		op: PostDocument & { author: UserType };
	}>({
		path: "op",
		options: { path: "author" },
	});

	const post = {
		id: op.id,
		message: op.message,
		likes: op.likedBy.length,
		author: op.author,
		createdAt: op.createdAt,
		updatedAt: op.updatedAt,
	};

	return {
		id,
		title,
		post,
		createdAt,
		updatedAt,
	};
}

describe("threads query", () => {
	const client = setupGraphQLServer();
	const options = QueryOptionsFactory.build();

	test("empty result when no thread", async () => {
		const { data } = await client.query(options);

		expect(data).toMatchObject({
			threads: {
				total: 0,
				edges: [],
			},
		});
	});

	test("gives list of threads", async () => {
		const threads = (await ThreadFactory.createList(2)).sort(
			(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
		);

		const edges = await Promise.all(
			threads.map(async thread => {
				return {
					node: await mountResult(thread),
				};
			})
		);

		await expect(client.query(options)).resolves.toMatchObject({
			data: {
				threads: {
					edges,
				},
			},
		});
	});

	test.todo("no replies gives no participants and no replies");
	test.todo("count whole replies subtree");
	test.todo("returns whole likes");
});
