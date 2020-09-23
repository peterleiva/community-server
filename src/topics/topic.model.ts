import { Schema, Document, model, Types } from 'mongoose';
import { User, UserModel } from '../users';
import CategoryModel, { Category } from './category.model';
import { ReplyModel, Reply } from './reply.model';
import autopopulate from 'mongoose-autopopulate';

/**
 * Represents a post by user
 *
 * A topic is a subject which some user like to discuss with other users. Topic
 * can be categorized or have some aditional statitical informations
 */
export class Topic {
  id!: Types.ObjectId;
  title!: string;
  author!: User;
  category?: Category;
  fixed?: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  replies?: Reply[];
}

export type TopicDocument = Topic & Document;

const TopicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 1,
      trim: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      immutable: true,
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: CategoryModel,
    },

    fixed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

TopicSchema.plugin(autopopulate);

// Populate direct replies from the topic
TopicSchema.virtual('replies', {
  ref: ReplyModel,
  localField: '_id',
  foreignField: 'topicId',

  justOne: false,
  options: { match: { repliedTo: null } },
});

export const TopicModel = model<TopicDocument>('Topic', TopicSchema);

export default TopicModel;
