import TopicFactory from '@app/topics/__mocks__/topic';
import { Topic } from '@app/topics';
import databaseSetup from 'test/helpers/database';

describe('Topics GraphQL Query', () => {
  databaseSetup();

  let topics: Topic[];

  beforeEach(async () => {
    topics = await Promise.all(TopicFactory.buildList(5));
  });

  it('Get all topics', () => {
    console.log(topics);
  });
});
