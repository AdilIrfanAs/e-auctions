import { Request, Response, NextFunction } from "express";
import { NativeError, Types } from "mongoose";
import { Payment, PaymentDocument } from "../models/payments.model";

export const create = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    await Payment.create(payload);
    
    return res.status(201).send({status: true, message: "Payment made successfully."});
  } catch (error) {
    next(error);
  }
};