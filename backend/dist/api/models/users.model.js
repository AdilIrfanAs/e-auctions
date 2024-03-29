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
exports.User = void 0;
var moment_1 = __importDefault(require("moment"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var mongoose_1 = require("mongoose");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { IUser, comparePasswordFunction } from "../interfaces/user.interface";
var vars_1 = __importDefault(require("../../config/vars"));
var pwdSaltRounds = vars_1.default.pwdSaltRounds, jwtExpirationInterval = vars_1.default.jwtExpirationInterval, pwEncryptionKey = vars_1.default.pwEncryptionKey;
/**
 * User Schema
 * @private
 */
var UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });
/**
 * Methods
 */
UserSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default.compare(password, this.password)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
// UserSchema.methods.transform = async function () {
//   const user = this as UserDocument;
//   let transformed: UserDocument;
//     const fields = ['_id', 'name', 'email'];
//     fields.forEach((field) => {
//       transformed[field] = user[field];
//     });
//     return transformed;
// };
UserSchema.methods.token = function () {
    return __awaiter(this, void 0, void 0, function () {
        var playload;
        return __generator(this, function (_a) {
            playload = {
                exp: (0, moment_1.default)().add(jwtExpirationInterval, 'minutes').unix(),
                iat: (0, moment_1.default)().unix(),
                sub: this._id,
            };
            return [2 /*return*/, jsonwebtoken_1.default.sign(playload, pwEncryptionKey)];
        });
    });
};
UserSchema.pre('save', function save(next) {
    return __awaiter(this, void 0, void 0, function () {
        var hash, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!this.isModified('password'))
                        return [2 /*return*/, next()];
                    return [4 /*yield*/, bcrypt_1.default.hash(this.password, pwdSaltRounds)];
                case 1:
                    hash = _a.sent();
                    this.password = hash;
                    return [2 /*return*/, next()];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, next(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
});
/**
 * @typedef User
 */
exports.User = (0, mongoose_1.model)('User', UserSchema);
;
