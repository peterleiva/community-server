import { Document, model, Schema, Types } from 'mongoose';
import Color from '../lib/mongoose/types/color';

/**
 * Classifies topics by named categories
 */
export class Category {
  id!: Types.ObjectId;
  name!: string;
  hexColor?: string;
}

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  hexColor: {
    type: Color,
    default: 0x0,
  },
});

type CategoryDocument = Category & Document;

export const CategoryModel = model<CategoryDocument>('Category', schema);
export default CategoryModel;
