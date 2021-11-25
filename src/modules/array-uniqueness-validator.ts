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
	for (let i = 0; i < list.length; i++) {
		for (let j = i + 1; j < list.length; j++) {
			if (Object.is(list[i], list[j])) {
				return false;
			}
		}
	}

	return true;
};

export const message: ValidatorMessageFn = ({ path, value }) => {
	return `array must have unique values. Duplicated at '${path}': [${value}]`;
};

export const validate = {
	validator,
	message,
};
