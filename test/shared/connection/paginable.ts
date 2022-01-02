import shouldBehavesLike from "../should-behaves-like";
import shouldBehavesLikeSliceable from "./sliceable";
import shouldBehavesLikeSkippable from "./skippable";
import type { Factory, Resolver } from "./types";

export default function shouldBehavesLikePaginable(
	factory: Factory,
	resolver: Resolver
) {
	shouldBehavesLike("paginable", () => {
		shouldBehavesLikeSliceable(factory, resolver);
		shouldBehavesLikeSkippable(factory, resolver);
	});
}
