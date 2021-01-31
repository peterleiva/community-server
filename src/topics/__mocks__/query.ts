import { MockList } from 'apollo-server-express';

export default {
  Query: () => ({
    topics: (): MockList => new MockList([0, 30]),
  }),
};
