"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bid = void 0;
var mongoose_1 = require("mongoose");
/**
 * Bid Schema
 * @private
 */
var BidSchema = new mongoose_1.Schema({
    value: { type: Number, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    itemId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Item', required: true },
    isAccepted: { type: Boolean, default: false }
}, { timestamps: true });
/**
 * @typedef Bid
 */
exports.Bid = (0, mongoose_1.model)('Bid', BidSchema);
;
