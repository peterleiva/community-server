import { MockList } from 'apollo-server-express';
import { Buffer } from 'buffer';
import { TopicsConnection } from '../topic.schema';
import incrementer from '../../lib/incrementer';

const inc = incrementer();

export default {
  Query: () => ({
    topics: (_: never, { pagination }: { pagination: TopicsConnection }) => ({
      edges: () =>
        new MockList(pagination.first, () => ({
          cursor: () => {
            const val = inc.next().value;
            return new Buffer('' + val).toString('base64');
          },
        })),
    }),
  }),
};
