import { Schema, Document, model } from 'mongoose';
import { User, UserModel } from 'users';
import CategoryModel, { Category } from './category.model';

export class Topic {
  id!: string;
  title!: string;
  author!: User;
  category?: Category;
  fixed = false;
  views = 0;
  lastVisitAt?: Date;
  createdAt!: Date;
  updatedAt!: Date;
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

    authorId: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      immutable: true,
      required: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: CategoryModel,
    },

    fixed: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastVisitAt: Date,
  },
  { timestamps: true }
);

export const TopicModel = model<TopicDocument>('Topic', TopicSchema);

export default TopicModel;
