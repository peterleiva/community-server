/**
 * Check if a attribute was trimmed correctly
 */

import { MongooseDocument } from 'mongoose';

export default expect.extend({
  toBeTrimmed(
    received: MongooseDocument,
    attribute: string,
    rawAttributeValue: string
  ): jest.CustomMatcherResult {
    const actual = received.get(attribute);
    let message = `expected ${received}`;
    const pass = !actual || actual === rawAttributeValue.trim();

    if (pass) {
      message += 'not be trimmed';

      return {
        pass,
        message: () => message,
      };
    } else {
      message += 'be trimmed';

      return {
        pass,
        message: () => message,
      };
    }
  },
});
