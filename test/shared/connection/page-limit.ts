import { NonNegativeArgument } from "lib";
import { PageArgs } from "modules/connection";
import { shouldBehavesLike } from "..";
import { Resolver, Factory } from "./types";

function setupPage(limit?: number): PageArgs {
	if (typeof limit === "undefined") {
		return {
			page: {},
		};
	}

	return {
		page: {
			first: limit,
		},
	};
}

export default function shouldBehavesLikePageLimit(
	factory: Factory,
	resolver: Resolver
) {
	shouldBehavesLike("page limit", () => {
		describe("Limiting Page size", () => {
			test("limit by with 'first' argument", async () => {
				await factory(4);
				const limit = 2;
				const page = setupPage(limit);

				await expect(resolver(page)).resolves.toBeEdgesOfSize(limit);
			});

			test("negative limit throws NonNegativeArgument", async () => {
				const page = setupPage(-1);

				await expect(resolver(page)).rejects.toThrowError(NonNegativeArgument);
			});

			test("zero limit returns empty page", async () => {
				await factory(1);
				const page = setupPage(0);

				await expect(resolver(page)).resolves.toHaveEmptyEdges();
			});

			test("limit page by avaliable threads", async () => {
				const page = setupPage(2);
				await factory(1);

				await expect(resolver(page)).resolves.toBeEdgesOfSize(1);
			});

			test("limit last page by avaliable remaining threads", async () => {
				const edges = await factory(3);
				const args = {
					page: {
						first: 2,
						after: edges[1].cursor,
					},
				};

				await expect(resolver(args)).resolves.toBeEdgesOfSize(1);
			});
		});
	});
}
