import TopicFactory from '../../__mocks__/topic';
import { Topic } from '../..';
import databaseSetup from 'helpers/database';

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
