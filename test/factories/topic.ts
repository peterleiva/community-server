import { lorem, random } from 'faker';
import { Types } from 'mongoose';
import { Factory } from 'rosie';
import UserFactory from './user';
import CategoryFactory from './category';
import { UserModel } from 'src/users';
import { CategoryModel } from 'src/topics';

export default Factory.define('topic')
  .sequence('_id', () => new Types.ObjectId())
  .attr('title', lorem.words())
  .attr('fixed', random.boolean())
  .after(async (topic) => {
    const author = await UserModel.create(UserFactory.build());
    const category = await CategoryModel.create(CategoryFactory.build());

    topic.author = author._id;
    topic.category = category._id;

    return topic;
  });
