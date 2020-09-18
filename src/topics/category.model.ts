import { Document, model, Schema } from 'mongoose';

/**
 * Classifies topics by named categories
 */
export class Category {
  id!: string;
  name!: string;
  hexColor?: string;
}

export const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  hexColor: {
    type: Color,
    default: '000',
  },
});

type CategoryDocument = Category & Document;

export const CategoryModel = model<CategoryDocument>('Category', schema);

export default CategoryModel;
