import { Types } from 'mongoose';
import { Factory } from 'rosie';
import { TopicModel } from 'src/topics';
import { UserModel } from 'src/users';
import UserFactory from './user';
import TopicFactory from './topic';

export default Factory.define('reply')
  .sequence('_id', () => new Types.ObjectId())
  .after(async (reply) => {
    // cria um topico, cria um autor
    const author = await UserModel.create(UserFactory.build());
    reply.author = author._id;

    const topic = await TopicModel.create(await TopicFactory.build());
    reply.topic = topic._id;

    return reply;
  });
