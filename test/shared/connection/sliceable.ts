import { NonNegativeArgument } from "lib";
import { shouldBehavesLike } from "..";
import { Resolver, Factory } from "./types";
import { setupPageArgs } from "test/factory";

export default function shouldBehavesLikeSliceable(
	factory: Factory,
	resolver: Resolver
) {
	shouldBehavesLike("sliceable", () => {
		describe("Limiting results", () => {
			test("limit by 'first' argument", async () => {
				const edges = await factory(2);
				const limit = 1;
				const page = setupPageArgs({ first: limit });

				const result = await resolver(page);

				expect(result).toBeFirstPage(limit);
				expect(result).toHaveNextPage();
				expect(result).toHaveCursors({
					startCursor: edges[0].cursor,
					endCursor: edges[0].cursor,
				});
			});

			test("negative limit throws NonNegativeArgument", async () => {
				const page = setupPageArgs({ first: -1 });

				await expect(resolver(page)).rejects.toThrowError(NonNegativeArgument);
			});

			test("zero returns empty edges", async () => {
				await factory(1);
				const page = setupPageArgs({ first: 0 });

				await expect(resolver(page)).resolves.toHaveEmptyEdges();
			});

			test("don't limit edges when edges is less than 'first'", async () => {
				const page = setupPageArgs({ first: 10 });
				const edges = await factory(2);

				const result = await resolver(page);

				expect(result).toBeFirstPage(edges.length);
				expect(result).toHaveCursors({
					startCursor: edges[0].cursor,
					endCursor: edges[1].cursor,
				});
				expect(result).not.toHaveNextPage();
			});

			test("limit with edges greater than 'first'", async () => {
				const edges = await factory(3);
				const args = setupPageArgs({
					first: 1,
					after: edges[1].cursor,
				});

				await expect(resolver(args)).resolves.toBeEdgesOfSize(1);
			});
		});
	});
}
