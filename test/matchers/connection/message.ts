import { printExpected, printReceived } from "jest-matcher-utils";

export default function message(
	isNot: boolean,
	received: unknown,
	expected: unknown
): () => string {
	const message = `
	Expected value to ${isNot ? "not " : ""}have:
		${printExpected(expected)}

	Received:
		${printReceived(received)}
	`;

	return () => message;
}
