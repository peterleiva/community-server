import { GET_THREADS } from "test/factory";
import { setupGraphQLServer } from "test/utils";

describe("threads query", () => {
	const client = setupGraphQLServer();

	test("empty result when no thread", async () => {
		const { data } = await client.query({ query: GET_THREADS });

		await expect(data).toMatchObject({
			threads: {
				total: 0,
				edges: [],
			},
		});
	});

	test.todo("gives list of threads");
	test.todo("no replies gives no participants and no replies");
	test.todo("count whole replies subtree");
	test.todo("returns whole likes");

	describe("Paginate", () => {
		test.todo("no result when first argument is 0");
	});
});
