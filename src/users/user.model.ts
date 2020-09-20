import { Document, model, Schema } from 'mongoose';

/**
 * Application user which can post topics and interact with each other
 */
export class User {
  id!: string;
  name!: string;
  email!: string;
  picture?: Buffer;
  location?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export type UserDocument = User & Document;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    picture: Buffer,

    location: {
      type: {
        type: String,
        enum: 'Point',
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', UserSchema);

export default UserModel;
