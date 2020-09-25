import { Document, model, Schema } from 'mongoose';
import { User, UserDocument, UserModel } from '../users';
import TopicModel, { Topic, TopicDocument } from './topic.model';
import autopopulate from 'mongoose-autopopulate';

/**
 * Represents a comment from a user to a specific topic.
 *
 * Replies can itself be replies by other users, so if constructs a tree
 * structure of comments for a topic posted by some user.
 */
export interface Reply {
  id?: any;
  author: User;
  replies?: Reply[];
  repliedTo?: Reply;
  topic: Topic;
  createdAt: Date;
  updatedAt: Date;
}

const ReplySchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
      immutable: true,
      autopopulate: true,
    },

    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reply',
        validate: [
          {
            validator: function (
              this: ReplyDocument,
              reply: ReplyDocument
            ): boolean {
              return reply.repliedTo.equals(this.id);
            },
            message: function (
              this: ReplyDocument,
              props: { path: string; value: unknown }
            ): string {
              return (
                `${props.path} must have parent set to ${this.id} but ` +
                `it have ${props.value}`
              );
            },
          },
          {
            validator: function (reply: ReplyDocument): boolean {
              return reply.repliedTo.topic.equals(reply.topic);
            },
            message: `Replies topic must be the same as repliedTo`,
          },
        ],
      },
    ],

    repliedTo: {
      type: Schema.Types.ObjectId,
      ref: 'Reply',
      default: null,
      immutable: true,
      autopopulate: true,
    },

    topic: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);

ReplySchema.plugin(autopopulate);

export interface ReplyDocument extends Document, Reply {
  author: UserDocument;
  topic: TopicDocument;
  repliedTo: ReplyDocument;
  replies: ReplyDocument[];
}

export const ReplyModel = model<ReplyDocument>('Reply', ReplySchema);

export default ReplyModel;
