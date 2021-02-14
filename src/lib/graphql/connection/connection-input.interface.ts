import type { Types } from 'mongoose';

export type Cursor = Types.ObjectId;

export interface ConnectionInput {
  first: number;
  after?: Cursor;
}
