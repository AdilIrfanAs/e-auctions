"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.drafts = exports.list = exports.update = exports.create = void 0;
var mongoose_1 = require("mongoose");
var items_model_1 = require("../models/items.model");
var create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, userId, startingBid, startTime, endTime, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, userId = _a.userId, startingBid = _a.startingBid, startTime = _a.startTime, endTime = _a.endTime;
                if (!name_1 || !userId || !startingBid || !startTime || !endTime) {
                    return [2 /*return*/, res.status(200).send({ status: false, message: "Please provide all required fields" })];
                }
                return [4 /*yield*/, items_model_1.Item.create({ name: name_1, userId: userId, startingBid: startingBid, startTime: startTime, endTime: endTime })];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(201).send({ status: true, message: "Item created successfully." })];
            case 2:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, item, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!req.params.id) {
                    return [2 /*return*/, res.status(200).send({ status: false, message: "Item id is required" })];
                }
                payload = req.body;
                return [4 /*yield*/, items_model_1.Item.findByIdAndUpdate({ _id: mongoose_1.Types.ObjectId(req.params.id) }, { $set: payload }, { new: true })];
            case 1:
                item = _a.sent();
                return [2 /*return*/, res.status(201).send({ status: true, message: "Item updated successfully.", item: item })];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
var list = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var type_1, filter, pipeline, items, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                type_1 = req.query.type;
                filter = {};
                pipeline = [];
                if (parseInt(type_1) === 1) {
                    pipeline.push({
                        $lookup: {
                            from: 'bids',
                            let: { itemId: "$_id" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ['$itemId', '$$itemId'] },
                                                { $eq: ['$isAccepted', true] }
                                            ]
                                        }
                                    }
                                },
                                {
                                    $lookup: {
                                        from: 'users',
                                        foreignField: '_id',
                                        localField: 'userId',
                                        as: 'bidder'
                                    }
                                },
                                {
                                    $project: {
                                        bidder: {
                                            $cond: [
                                                { $ne: ['$bidder', []] },
                                                { $arrayElemAt: ['$bidder.name', 0] },
                                                null
                                            ]
                                        }
                                    }
                                }
                            ],
                            as: 'bid' // accepted bid
                        }
                    }, {
                        $project: {
                            _id: 1,
                            name: 1,
                            published: 1,
                            endTime: 1,
                            bidder: {
                                $cond: [
                                    { $ne: ['$bid', []] },
                                    { $arrayElemAt: ['$bid.bidder', 0] },
                                    false
                                ]
                            }
                        }
                    }, {
                        $match: {
                            $and: [
                                {
                                    published: true
                                },
                                {
                                    $or: [
                                        {
                                            endTime: { $lte: new Date() },
                                        },
                                        {
                                            bidder: { $ne: false }
                                        }
                                    ]
                                }
                            ]
                        }
                    }, {
                        $project: {
                            _id: 1,
                            name: 1,
                            bidder: 1
                        }
                    });
                }
                else if (parseInt(type_1) === 2) {
                    filter = { $and: [{ startTime: { $lte: new Date() } }, { endTime: { $gte: new Date() } }], published: true };
                    pipeline.push({
                        $match: filter
                    });
                }
                else if (parseInt(type_1) === 3) {
                    filter = { published: { $ne: true } };
                    pipeline.push({
                        $match: filter
                    });
                }
                else if (parseInt(type_1) === 4) {
                    filter = { startTime: { $gt: new Date() }, published: true };
                    pipeline.push({
                        $match: filter
                    });
                }
                return [4 /*yield*/, items_model_1.Item.aggregate(pipeline)];
            case 1:
                items = _a.sent();
                return [2 /*return*/, res.status(200).send({ status: true, message: "Item created successfully.", items: items })];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.list = list;
var drafts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, filter, items, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                filter = { published: { $ne: true }, userId: mongoose_1.Types.ObjectId(userId) };
                return [4 /*yield*/, items_model_1.Item.aggregate([
                        {
                            $match: filter
                        }
                    ])];
            case 1:
                items = _a.sent();
                return [2 /*return*/, res.status(200).send({ status: true, message: "Item created successfully.", items: items })];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.drafts = drafts;
var get = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, filter, items, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                filter = { _id: mongoose_1.Types.ObjectId(id) };
                return [4 /*yield*/, items_model_1.Item.aggregate([
                        {
                            $match: filter
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "userId",
                                foreignField: "_id",
                                as: "creator"
                            }
                        },
                        {
                            $unwind: {
                                path: "$creator",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $lookup: {
                                from: 'bids',
                                let: { itemId: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ['$itemId', '$$itemId'] },
                                                ]
                                            }
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: 'users',
                                            foreignField: '_id',
                                            localField: 'userId',
                                            as: 'bidder'
                                        }
                                    },
                                    {
                                        $sort: {
                                            createdAt: -1
                                        }
                                    },
                                    {
                                        $project: {
                                            _id: 1,
                                            value: 1,
                                            bidder: {
                                                $cond: [
                                                    { $ne: ['$bidder', []] },
                                                    { $arrayElemAt: ['$bidder.name', 0] },
                                                    null
                                                ]
                                            },
                                            createdAt: 1
                                        }
                                    }
                                ],
                                as: 'bids'
                            }
                        },
                        {
                            $project: {
                                name: 1,
                                creator: "$creator.name",
                                userId: 1,
                                startingBid: 1,
                                bids: "$bids",
                                startTime: 1,
                                endTime: 1,
                                published: 1,
                                highestBid: { $max: '$bids.value' }
                            }
                        }
                    ])];
            case 1:
                items = _a.sent();
                return [2 /*return*/, res.status(200).send({ status: items.length ? true : false, message: "Item created successfully.", item: items.length ? items[0] : null })];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.get = get;
