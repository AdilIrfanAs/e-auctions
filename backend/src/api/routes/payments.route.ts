import { Router } from "express";
import { create } from "../controllers/payments.controller";
const authRouter = Router();

authRouter.route("/").post(create);

export default authRouter;
