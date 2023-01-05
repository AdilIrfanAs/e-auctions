"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
var mongoose_1 = require("mongoose");
/**
 * Item Schema
 * @private
 */
var ItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    startingBid: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    published: { type: Boolean, default: false },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
/**
 * @typedef Item
 */
exports.Item = (0, mongoose_1.model)('Item', ItemSchema);
;
