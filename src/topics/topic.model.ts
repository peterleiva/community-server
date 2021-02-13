import { Schema, Document, model, Aggregate, Types } from 'mongoose';
import { User, UserDocument, UserModel } from '../users';
import CategoryModel, { Category, CategoryDocument } from './category.model';
import { Reply, ReplyDocument } from './reply.model';

/**
 * Represents a post by user
 *
 * A topic is a subject which some user like to discuss with other users. Topic
 * can be categorized or have some aditional statitical informations
 */
export class Topic {
  id?: Types.ObjectId;
  _id?: Types.ObjectId;
  title!: string;
  author!: User;
  category?: Category;
  replies?: Reply[];
  fixed?: boolean;
  numReplies!: number;
  createdAt!: Date;
  updatedAt!: Date;
  private _participants: Aggregate<UserDocument[]> | undefined;

  get participants(): Aggregate<UserDocument[]> {
    this._participants ||= UserModel.aggregate<UserDocument>([
      {
        $graphLookup: {
          from: 'replies',
          startWith: '$_id',
          connectFromField: '_id',
          connectToField: 'author',
          as: 'replies',
          restrictSearchWithMatch: { topic: this._id },
        },
      },
      { $match: { 'replies.topic': { $exists: true } } },
    ]);

    return this._participants;
  }
}

export type TopicDocument = Topic &
  Document & {
    replies?: ReplyDocument[];
    author: UserDocument;
    participants?: UserDocument[];
    category?: CategoryDocument;
  };

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
  ref: 'Reply',
  localField: '_id',
  foreignField: 'topic',
  options: { match: { repliedTo: null } },
});

TopicSchema.virtual('numReplies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'topic',
  count: true,
});

TopicSchema.loadClass(Topic);

export const TopicModel = model<TopicDocument>('Topic', TopicSchema);
export default TopicModel;
