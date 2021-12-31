import { shouldBehavesLike } from "test/shared";
import type { Resolver } from "./types";

export default function shouldBehavesLikeConnection(resolver: Resolver) {
	shouldBehavesLike("connection", () => {
		describe("Empty edges", () => {
			test("edges collection is empty", async () => {
				await expect(resolver()).resolves.toHaveEmptyEdges();
			});

			test("pageInfo has no previous or next page", async () => {
				const result = await resolver();

				expect(result).not.toHavePreviousPage();
				expect(result).not.toHaveNextPage();
			});
		});
	});
}
