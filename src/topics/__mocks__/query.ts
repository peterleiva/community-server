import { IResolverObject, MockList } from 'apollo-server-express';
import { ConnectionInput } from '../../lib/graphql/connection/connection-input.interface';

export default {
  Query: (): IResolverObject<
    never,
    never,
    { pagination: ConnectionInput }
  > => ({
    topics: (_: never, { pagination }: { pagination: ConnectionInput }) => ({
      edges: () => new MockList(pagination.first),
    }),
  }),
};
