import { Document, model, Schema, Types } from 'mongoose';
import Color from '../lib/mongoose/types/color';

/**
 * Classifies topics by named categories
 */
export class Category {
  id!: Types.ObjectId;
  name!: string;
  backgroundColor!: string;
}

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  backgroundColor: {
    type: Color,
    default: 0x0,
    get: (v: number) => '#' + v.toString(16).padStart(6, '0'),
  },
});

export type CategoryDocument = Category & Document;

export const CategoryModel = model<CategoryDocument>(
  'Category',
  CategorySchema
);

export default CategoryModel;
