import { GET_THREADS, ThreadFactory } from "test/factory";
import { setupGraphQLServer } from "test/utils";
import { PostDocument } from "modules/post";
import { ThreadDocument } from "modules/threads";
import { ThreadType, ThreadConnection } from "modules/threads/schema";

async function mountResult(
	thread: ThreadDocument
): Promise<Partial<ThreadType>> {
	const {
		_id: id,
		title,
		createdAt,
		updatedAt,
		op,
	} = await thread.populate<{ op: PostDocument }>({
		path: "op",
	});

	const post = {
		id: op.id,
		message: op.message,
	};

	return {
		id,
		title,
	};
}

describe("threads query", () => {
	const client = setupGraphQLServer();

	test("empty result when no thread", async () => {
		const { data } = await client.query({ query: GET_THREADS });

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

		await expect(client.query({ query: GET_THREADS })).resolves.toMatchObject({
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
