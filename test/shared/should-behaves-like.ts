interface Behavior {
	(): void;
}

export default function shouldBehavesLike(
	description: string,
	behavior: Behavior
) {
	describe(`Should behaves like ${description}`, () => {
		behavior();
	});
}
