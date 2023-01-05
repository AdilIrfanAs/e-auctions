import { Request, Response, NextFunction } from "express";
import { NativeError, Types } from "mongoose";
import { Item, ItemDocument } from "../models/items.model";

type ItemPayload = {

}

export const create = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const item = await Item.create(payload);
    return res.status(201).send({status: true, message: "Item created successfully.", item});
  } catch (error) {
    next(error);
  }
};

export const update = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    await Item.updateOne({_id: Types.ObjectId(req.params.id)}, {$set:payload})
  } catch (error) {
    next(error);
  }
};

export const list = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    await Item.aggregate([
        {
            $match: {published: true}
        }
    ])
  } catch (error) {
    next(error);
  }
};