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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
var passport_1 = __importDefault(require("passport"));
var users_model_1 = require("../models/users.model");
var passport_local_1 = require("passport-local");
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                if (!(email && password)) return [3 /*break*/, 3];
                email = email.toLowerCase();
                return [4 /*yield*/, users_model_1.User.findOne({ email: email }, { createdAt: 0, updatedAt: 0, __v: 0 })];
            case 1:
                user = _b.sent();
                if (user) {
                    return [2 /*return*/, res
                            .status(200)
                            .send({ status: false, message: "User already exists" })];
                }
                return [4 /*yield*/, users_model_1.User.create({
                        name: name_1,
                        email: email,
                        password: password,
                    })];
            case 2:
                user = _b.sent();
                return [2 /*return*/, res.status(200).send({
                        status: true,
                        message: "User registered successfully"
                    })];
            case 3: return [2 /*return*/, res
                    .status(200)
                    .send({ status: false, message: "Required fields are missing" })];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
/**
 * Returns jwt token if valid email and password is provided
 * @public
 */
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password;
    return __generator(this, function (_b) {
        try {
            _a = req.body, email = _a.email, password = _a.password;
            if (email && password) {
                email = email.toLowerCase();
                // call for passport authentication
                /**
                 * Sign in using Email and Password.
                 */
                passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email" }, function (email, password, done) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, users_model_1.User.findOne({ email: email.toLowerCase() }, function (err, user) {
                                        if (err) {
                                            return done(err);
                                        }
                                        if (!user) {
                                            return done(undefined, false, {
                                                message: "Email ".concat(email, " not found."),
                                            });
                                        }
                                        if (!user.comparePassword(password))
                                            // wrong password
                                            return done(null, false, {
                                                message: "Incorrect email or password",
                                            });
                                        return done(null, user);
                                    })];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                error_2 = _a.sent();
                                done(error_2);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }));
                passport_1.default.authenticate("local", function (err, user, info) { return __awaiter(void 0, void 0, void 0, function () {
                    var accessToken, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!err) return [3 /*break*/, 1];
                                return [2 /*return*/, res.status(400).send({
                                        err: err,
                                        status: false,
                                        message: "Oops! Something went wrong while authenticating",
                                    })];
                            case 1:
                                if (!user) return [3 /*break*/, 4];
                                return [4 /*yield*/, user.token()];
                            case 2:
                                accessToken = _a.sent();
                                data = {
                                    name: user.name,
                                    _id: user._id,
                                    email: user.email,
                                    accessToken: accessToken
                                };
                                return [4 /*yield*/, users_model_1.User.updateOne({ _id: user._id }, { $set: { accessToken: accessToken } }, { upsert: true })];
                            case 3:
                                _a.sent();
                                return [2 /*return*/, res.status(200).send({
                                        status: true,
                                        message: "You have logged in successfully",
                                        data: data,
                                    })];
                            case 4: return [2 /*return*/, res
                                    .status(200)
                                    .send({ status: false, message: "Incorrect email or password" })];
                        }
                    });
                }); })(req, res, next);
            }
            else
                return [2 /*return*/, res
                        .status(200)
                        .send({ status: false, message: "Email & password required" })];
        }
        catch (error) {
            console.log(error);
            return [2 /*return*/, res.send(error)];
            // return next(error);
        }
        return [2 /*return*/];
    });
}); };
exports.login = login;
