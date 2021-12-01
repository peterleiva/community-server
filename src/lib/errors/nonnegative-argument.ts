export default class NonNegativeArgument extends RangeError {
	constructor(argument: string, value: number) {
		super(`${argument} argument must be non-negative. Given: ${value}`);
	}
}
