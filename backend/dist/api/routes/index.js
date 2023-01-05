"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_route_1 = __importDefault(require("./auth.route"));
var items_route_1 = __importDefault(require("./items.route"));
var payments_route_1 = __importDefault(require("./payments.route"));
var router = (0, express_1.Router)();
router.use("/payments", payments_route_1.default);
router.use("/auth", auth_route_1.default);
router.use("/items", items_route_1.default);
exports.default = router;
