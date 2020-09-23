import { Document, model, Schema, Types } from 'mongoose';
import { User, UserModel } from '../users';
import TopicModel, { Topic } from './topic.model';

/**
 * Represents a comment from a user to a specific topic.
 *
 * Replies can itself be replies by other users, so if constructs a tree
 * structure of comments for a topic posted by some user.
 */
export class Reply {
  id!: Types.ObjectId;
  author!: User;
  replies?: Reply;
  topic!: Topic;
  createdAt!: Date;
  updatedAt!: Date;
}

export const ReplySchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
      immutable: true,
    },

    repliesIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reply',
      },
    ],

    topicId: {
      type: Schema.Types.ObjectId,
      ref: TopicModel,
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);

export type ReplyDocument = Reply & Document;

export const ReplyModel = model<ReplyDocument>('Reply', ReplySchema);

export default ReplyModel;
