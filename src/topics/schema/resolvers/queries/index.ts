import { IResolverObject } from 'apollo-server-express';
import topics from './topics';

const TopicsQueryResolver: IResolverObject<never, never> = {
  Query: {
    topics,
  },
};

export default TopicsQueryResolver;
