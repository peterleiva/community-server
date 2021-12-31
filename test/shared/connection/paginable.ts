import shouldBehavesLike from "../should-behaves-like";
import shouldBehavesLikePageLimit from "./page-limit";
import shouldBehavesLikeSliceable from "./sliceable";
import type { Factory, Resolver } from "./types";

export default function shouldBehavesLikePaginable(
	factory: Factory,
	resolver: Resolver
) {
	shouldBehavesLike("paginable", () => {
		describe("No page argument", () => {
			describe("More than 20 items", () => {
				const size = 21;

				beforeEach(async () => await factory(size));

				test("edges has 20 items", async () => {
					await expect(resolver()).resolves.toBeEdgesOfSize(20);
				});

				test("pageInfo has next page but no previous", async () => {
					const result = await resolver();

					expect(result).toHaveNextPage();
					expect(result).not.toHavePreviousPage();
				});
			});

			describe("Less than 20 items", () => {
				const size = 1;

				beforeEach(async () => await factory(size));

				test("edges has the whole items", async () => {
					await expect(resolver()).resolves.toBeEdgesOfSize(size);
				});

				test("pageInfo have no next or previous page", async () => {
					const result = await resolver();

					expect(result).not.toHaveNextPage();
					expect(result).not.toHavePreviousPage();
				});
			});
		});

		describe("with page argument", () => {
			shouldBehavesLikePageLimit(factory, resolver);
			shouldBehavesLikeSliceable(factory, resolver);
		});
	});
}
