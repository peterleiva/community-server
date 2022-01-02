import { NonNegativeArgument } from "lib";
import { shouldBehavesLike } from "..";
import { Resolver, Factory } from "./types";
import { Page } from "modules/connection";
import { setupPageArgs } from "test/factory";

export default function shouldBehavesLikeSliceable(
	factory: Factory,
	resolver: Resolver
) {
	shouldBehavesLike("sliceable", () => {
		test("slice to default page size", async () => {
			await factory(21);
			const results = await resolver();

			expect(results).toBeFirstPage(Page.DEFAULT_SIZE);
			expect(results).toHaveNextPage();
		});

		test("no slicing", async () => {
			const edges = await factory(2);
			const result = await resolver();

			expect(result).toBeFirstPage(edges.length);
			expect(result).not.toHaveNextPage();
			expect(result).not.toHavePreviousPage();
		});

		describe("with 'first' argument", () => {
			test("slicing edges greater than 'first'", async () => {
				const edges = await factory(3);
				const limit = 1;
				const page = setupPageArgs({ first: limit, after: edges[0].cursor });

				const result = await resolver(page);

				expect(result).toHavePreviousPage();
				expect(result).toHaveNextPage();
				expect(result).toMatchPageInfo({
					startCursor: edges[1].cursor,
					endCursor: edges[1].cursor,
				});
			});

			test("negative value throws NonNegativeArgument", async () => {
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
				expect(result).toMatchPageInfo({
					startCursor: edges[0].cursor,
					endCursor: edges[1].cursor,
				});
				expect(result).not.toHaveNextPage();
				expect(result).not.toHavePreviousPage();
			});
		});
	});
}
