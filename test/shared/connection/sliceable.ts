import shouldBehavesLike from "../should-behaves-like";
import { Resolver, Factory } from "./types";
import { setupPageArgs } from "test/factory";

export default function shouldBehavesLikeSliceable(
	factory: Factory,
	resolver: Resolver
) {
	shouldBehavesLike("sliceable", () => {
		test("slicing collection with 'after'", async () => {
			const edges = await factory(2);
			const args = setupPageArgs({ after: edges[0].cursor });

			const result = await resolver(args);

			expect(result).toBeEdgesOfSize(1);
			expect(result).toHavePreviousPage();
			expect(result).not.toHaveNextPage();
		});

		test("skip first page", async () => {
			const edges = await factory(21);
			const args = setupPageArgs({ after: edges[19].cursor });

			const result = await resolver(args);

			expect(result).toBeEdgesOfSize(1);
			expect(result).toHavePreviousPage();
		});

		test("skip until last page", async () => {
			const edges = await factory(6);
			const args = setupPageArgs({ after: edges[3].cursor });

			const result = await resolver(args);

			expect(result).toBeEdgesOfSize(2);
			expect(result).not.toHaveNextPage();
			expect(result).toHavePreviousPage();
		});

		test("empty result after last thread", async () => {
			const edges = await factory(2);
			const args = setupPageArgs({ after: edges[1].cursor });

			const result = await resolver(args);

			expect(result).toHaveEmptyEdges();
			expect(result).not.toHaveNextPage();
			expect(result).toHavePreviousPage();
		});

		test("first page when after cursor is now date", async () => {
			await factory(1);
			const page = setupPageArgs({ after: new Date() });

			await expect(resolver(page)).resolves.toBeFirstPage(1);
		});
	});
}
