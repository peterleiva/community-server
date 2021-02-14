import { IFieldResolver } from 'apollo-server-express';
import { TopicDocument, TopicModel } from '../../..';

const topics: IFieldResolver<never, never> = async (): Promise<
  TopicDocument[]
> => {
  return TopicModel.find({}).exec();
};

export default topics;
