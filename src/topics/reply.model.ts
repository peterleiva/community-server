import { Document, model, Schema, Types } from 'mongoose';
import { User, UserModel } from '../users';

/**
 * Represents a comment from a user to a specific topic.
 *
 * Replies can itself be replies by other users, so if constructs a tree
 * structure of comments for a topic posted by some user.
 */
export class Reply {
  id!: Types.ObjectId;
  author!: User;
  repliedTo?: Reply;
  createdAt!: Date;
  updatedAt!: Date;
}

export const ReplySchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
    },

    repliedToId: {
      type: Schema.Types.ObjectId,
      ref: 'Reply',
    },
  },
  { timestamps: true }
);

export type ReplyDocument = Reply & Document;

export const ReplyModel = model<ReplyDocument>('Reply', ReplySchema);

export default ReplyModel;
