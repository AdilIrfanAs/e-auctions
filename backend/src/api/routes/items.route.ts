import { Router } from "express";
import { create, update, list, get, drafts } from "../controllers/items.controller";
const authRouter = Router();

authRouter.route("/").post(create);
authRouter.route("/:id").put(update);
authRouter.route("/").get(list);
authRouter.route("/drafts/:userId").get(drafts);
authRouter.route("/:id").get(get);

export default authRouter;