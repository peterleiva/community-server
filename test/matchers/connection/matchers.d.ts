/// <reference types="jest" />

declare namespace jest {
	export interface Matchers<R> {
		toHaveNextPage(): R;
	}
}
