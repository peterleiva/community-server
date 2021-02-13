import { MockList } from 'apollo-server-express';
import { TopicsConnection } from '../topic.schema';

export default {
  Query: () => ({
    topics: (_: never, { pagination }: { pagination: TopicsConnection }) => ({
      edges: () => new MockList(pagination.first),
    }),
  }),
};
