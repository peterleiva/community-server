import * as connection from "./connection";

if (expect) {
	expect.extend({
		...connection,
	});
} else {
	throw new Error(
		"Unable to find Jest expect global variable. Please setup jest to install" +
			"custom matchers"
	);
}
