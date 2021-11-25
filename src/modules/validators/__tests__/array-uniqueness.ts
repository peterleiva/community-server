import { validator } from "../array-uniqueness";

describe("Array Uniqueness validator", () => {
	const valids: [string, unknown[]][] = [
		["empty list", []],
		["single item", ["item"]],
		["unique values", [1, 2, 3, 4, 5]],
	];

	const invalids: [string, unknown[]][] = [
		["first and last", [1, 2, 3, 4, 1]],
		["last two", [1, 2, 3, 4, 4]],
		["first two", [1, 1, 3, 4, 5]],
		["random", [1, 2, 3, 2, 1]],
		["only duplicated", [2, 2]],
	];

	it.each(valids)("valid with %s", (_, list: unknown[]) => {
		expect(validator(list)).toBe(true);
	});

	it.each(invalids)("invalid with %s items equal", (_, list: unknown[]) => {
		expect(validator(list)).toBe(false);
	});
});
