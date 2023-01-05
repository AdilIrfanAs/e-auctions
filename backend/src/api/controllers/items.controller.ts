import { Request, Response, NextFunction } from "express";
import { NativeError, Types } from "mongoose";
import { Item, ItemDocument } from "../models/items.model";
import { CreatePayload, UpdatePayload, ListItemsPayload } from "../interfaces-types/items";
import { type } from "os";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, userId, startingBid, startTime, endTime }: CreatePayload = req.body;
    if (!name || !userId || !startingBid || !startTime || !endTime) {
      return res.status(200).send({ status: false, message: "Please provide all required fields" });
    }
    await Item.create({ name, userId, startingBid, startTime, endTime });
    return res.status(201).send({ status: true, message: "Item created successfully." });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.id) {
      return res.status(200).send({ status: false, message: "Item id is required" });
    }
    const payload: UpdatePayload = req.body;
    const item = await Item.findByIdAndUpdate({ _id: Types.ObjectId(req.params.id) }, { $set: payload }, { new: true });
    return res.status(201).send({ status: true, message: "Item updated successfully.", item });
  } catch (error) {
    next(error);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type }: any = req.query;
    let filter = {}
    let pipeline = [];
    if (parseInt(type) === 1) {
      pipeline.push(
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
        },
        {
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
        },
        {
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
        },
        {
          $project: {
            _id: 1,
            name: 1,
            bidder: 1
          }
        }
      )
    }
    else if (parseInt(type) === 2) {
      filter = { $and: [{ startTime: { $lte: new Date() } }, { endTime: { $gte: new Date() } }], published: true }
      pipeline.push({
        $match: filter
      });
    }
    else if (parseInt(type) === 3) {
      filter = { published: { $ne: true } }
      pipeline.push({
        $match: filter
      });
    }
    else if (parseInt(type) === 4) {
      filter = { startTime: { $gt: new Date() }, published: true }
      pipeline.push({
        $match: filter
      });
    }

    const items = await Item.aggregate(pipeline)
    return res.status(200).send({ status: true, message: "Item created successfully.", items });
  } catch (error) {
    next(error);
  }
};

export const drafts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId }: any = req.params;
    const filter = { published: { $ne: true }, userId: Types.ObjectId(userId) }
    const items = await Item.aggregate([
      {
        $match: filter
      }
    ])
    return res.status(200).send({ status: true, message: "Item created successfully.", items });
  } catch (error) {
    next(error);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const filter = { _id: Types.ObjectId(id) };

    const items = await Item.aggregate([
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
    ])
    return res.status(200).send({ status: items.length ? true : false, message: "Item created successfully.", item: items.length ? items[0] : null });
  } catch (error) {
    next(error);
  }
};