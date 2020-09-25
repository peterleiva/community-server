import { Document, model, Schema, Types } from 'mongoose';
import Color from '../lib/mongoose/types/color';

/**
 * Classifies topics by named categories
 */
export interface Category {
  id: Types.ObjectId;
  name: string;
  backgroundColor: string;
}

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1,
    maxlength: 144,
  },

  backgroundColor: {
    type: Color,
    default: 0x0,
    get: (color: number) => '#' + color.toString(16).padStart(6, '0'),
  },
});

export type CategoryDocument = Category & Document;

export const CategoryModel = model<CategoryDocument>(
  'Category',
  CategorySchema
);

export default CategoryModel;
