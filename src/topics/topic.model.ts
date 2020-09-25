import { Schema, Document, model } from 'mongoose';
import { User, UserDocument, UserModel } from '../users';
import CategoryModel, { Category, CategoryDocument } from './category.model';
import { ReplyModel, Reply, ReplyDocument } from './reply.model';

/**
 * Represents a post by user
 *
 * A topic is a subject which some user like to discuss with other users. Topic
 * can be categorized or have some aditional statitical informations
 */
export interface Topic {
  id?: any;
  title: string;
  author: User;
  participants?: User[];
  category?: Category;
  replies?: Reply[];
  fixed?: boolean;
  numReplies: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TopicDocument extends Topic, Document {
  replies?: ReplyDocument[];
  author: UserDocument;
  participants?: UserDocument[];
  category?: CategoryDocument;
}

const TopicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 1,
      maxlength: 255,
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

// Populate direct replies from the topic
TopicSchema.virtual('replies', {
  ref: ReplyModel,
  localField: '_id',
  foreignField: 'topic',
  options: { match: { repliedTo: null } },
});

TopicSchema.virtual('numReplies', {
  ref: ReplyModel,
  localField: '_id',
  foreignField: 'topic',
  count: true,
});

export const TopicModel = model<TopicDocument>('Topic', TopicSchema);
export default TopicModel;
