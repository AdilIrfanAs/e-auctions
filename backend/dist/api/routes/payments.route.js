"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var payments_controller_1 = require("../controllers/payments.controller");
var authRouter = (0, express_1.Router)();
authRouter.route("/").post(payments_controller_1.create);
exports.default = authRouter;
