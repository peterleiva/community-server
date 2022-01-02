import shouldBehavesLike from "../should-behaves-like";
import { Resolver, Factory } from "./types";
import { setupPageArgs } from "test/factory";

export default function shouldBehavesLikeSkippable(
	factory: Factory,
	resolver: Resolver
) {
	shouldBehavesLike("skippable", () => {
		describe("with 'after' argument", () => {
			test("skipping edges", async () => {
				const edges = await factory(2);
				const args = setupPageArgs({ after: edges[0].cursor });

				const result = await resolver(args);

				expect(result).toBeEdgesOfSize(1);
				expect(result).toMatchPageInfo({
					hasNextPage: false,
					hasPreviousPage: true,
					startCursor: edges[1].cursor,
					endCursor: edges[1].cursor,
				});
			});

			test("skip first page", async () => {
				const edges = await factory(21);
				const args = setupPageArgs({ after: edges[19].cursor });

				const result = await resolver(args);

				expect(result).toBeEdgesOfSize(1);
				expect(result).toHavePreviousPage();
				expect(result).toMatchPageInfo({
					startCursor: edges[20].cursor,
					endCursor: edges[20].cursor,
				});
			});

			test("skip until last page", async () => {
				const edges = await factory(6);
				const args = setupPageArgs({ after: edges[3].cursor });

				const result = await resolver(args);

				expect(result).toBeEdgesOfSize(2);
				expect(result).not.toHaveNextPage();
				expect(result).toHavePreviousPage();
			});

			test("empty edges after last edge ever", async () => {
				const edges = await factory(1);
				const cursor = edges[0].cursor;
				const args = setupPageArgs({ after: cursor });

				const result = await resolver(args);

				expect(result).toHaveEmptyEdges();
				expect(result).toMatchPageInfo({
					hasNextPage: false,
					hasPreviousPage: true,
					startCursor: cursor,
					endCursor: cursor,
				});
			});
		});
	});
}
