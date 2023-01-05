import { Schema, model, Document, Date } from 'mongoose';

export type PaymentDocument = Document & {
  amount: string;
  userId: Schema.Types.ObjectId;
};

/**
 * Payment Schema
 * @private
 */
const PaymentSchema = new Schema<PaymentDocument>({
  amount: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

/**
 * @typedef Payment
 */
export const Payment = model<PaymentDocument>('Payment', PaymentSchema);;