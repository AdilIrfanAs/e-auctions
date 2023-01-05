import { Schema, model, Document, Date } from 'mongoose';

export type BidDocument = Document & {
  name: string;
  startPrice: Number;
  startDate: Date;
  endDate: Date;
};

/**
 * Bid Schema
 * @private
 */
const BidSchema = new Schema<BidDocument>({
  value: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  isAccepted: { type: Boolean, default: false }
}, { timestamps: true });

/**
 * @typedef Bid
 */
export const Bid = model<BidDocument>('Bid', BidSchema);;