import { ValidateFn, ValidatorMessageFn } from "mongoose";

/**
 * O(n^2) validates whether array has duplicated values, if that's the case
 * returns false
 *
 * TODO: Use BST to find duplicated values and improove the complexity
 * @param list array to search duplicated values
 * @return when no duplicated values occurs return true
 */
export const validator: ValidateFn<unknown[]> = function validator(list) {
	const values = new Set<unknown>();

	list.forEach(v => values.add(v));

	return values.size === list.length;
};

export const message: ValidatorMessageFn = ({ path, value }) => {
	return `array must have unique values. Duplicated at '${path}': [${value}]`;
};

export const validate = {
	validator,
	message,
};
