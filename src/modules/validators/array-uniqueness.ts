import { ValidateFn, ValidatorMessageFn } from "mongoose";

/**
 * O(1). check whether array has duplicates
 *
 * @param list array to search for duplicates
 * @return duplicates values occurs return true
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
