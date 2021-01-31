import { MockList } from 'apollo-server-express';
import { TopicsConnection } from '../topic.schema';
import { Buffer } from 'buffer';
import incrementer from '../../lib/incrementer';

const inc = incrementer();

export default {
  Query: () => ({
    topics: (_, { connection }: { connection: TopicsConnection }) => ({
      edges: () =>
        new MockList(connection.first, () => ({
          cursor: () => {
            const val = inc.next().value;
            return new Buffer('' + val).toString('base64');
          },
        })),
    }),
  }),
};
