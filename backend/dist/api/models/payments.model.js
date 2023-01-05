"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
var mongoose_1 = require("mongoose");
/**
 * Payment Schema
 * @private
 */
var PaymentSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
/**
 * @typedef Payment
 */
exports.Payment = (0, mongoose_1.model)('Payment', PaymentSchema);
;
