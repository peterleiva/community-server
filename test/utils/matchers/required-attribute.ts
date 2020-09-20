/**
 * Custom matcher to test required field for mongoose documents
 */

import { MongooseDocument } from 'mongoose';

export default expect.extend({
  toHaveRequired(
    received: MongooseDocument,
    attribute: string
  ): jest.CustomMatcherResult {
    received.set(attribute, undefined);

    const error = received.validateSync();
    const pass =
      error?.errors?.[attribute]?.message ===
      `Path \`${attribute}\` is required.`;

    if (pass) {
      return {
        pass: true,
        message: () => `expected ${received} to be undefined`,
      };
    } else {
      return {
        pass: false,
        message: () => `expected ${received} not to be undefined`,
      };
    }
  },
});
