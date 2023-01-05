import { Schema, model, Document, Date } from 'mongoose';

export type ItemDocument = Document & {
  name: string;
  startPrice: Number;
  startDate: Date;
  endDate: Date;
};

/**
 * Item Schema
 * @private
 */
const ItemSchema = new Schema<ItemDocument>({
  name: { type: String, required: true },
  startingBid: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  published: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

/**
 * @typedef Item
 */
export const Item = model<ItemDocument>('Item', ItemSchema);;