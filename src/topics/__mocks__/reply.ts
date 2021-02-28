import { Types } from 'mongoose';
import { Factory } from 'rosie';
import TopicModel from 'topics/topic.model';
import UserModel from 'users/user.model';
import UserFactory from '../../users/__mocks__/user';
import TopicFactory from './topic';

export default Factory.define('reply')
  .sequence('_id', () => new Types.ObjectId())
  .after(async reply => {
    if (!reply.author) {
      const author = await UserModel.create(UserFactory.build());
      reply.author = author._id;
    }

    if (!reply.topic) {
      const topic = await TopicModel.create(await TopicFactory.build());
      reply.topic = topic._id;
    }

    return reply;
  });
