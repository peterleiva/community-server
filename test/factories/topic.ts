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
    if (!topic.author) {
      const author = await UserModel.create(UserFactory.build());
      topic.author = author._id;
    }

    if (!topic.category) {
      const category = await CategoryModel.create(CategoryFactory.build());
      topic.category = category._id;
    }

    return topic;
  });
