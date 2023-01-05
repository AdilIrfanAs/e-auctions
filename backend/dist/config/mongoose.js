"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnect = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
// const { mongo, env } = require('./vars');
var vars_1 = __importDefault(require("./vars"));
var mongoUri = vars_1.default.mongoUri, env = vars_1.default.env;
// set mongoose Promise to Bluebird
mongoose_1.default.Promise = Promise;
// Exit application on error
mongoose_1.default.connection.on('error', function (err) {
    process.exit(-1);
});
// print mongoose logs in dev env
if (env === 'development') {
    mongoose_1.default.set('debug', true);
}
/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
var mongoConnect = function () {
    mongoUri ? mongoose_1.default.connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        keepAlive: true,
    }) :
        process.exit(1);
    ;
    return mongoose_1.default.connection;
};
exports.mongoConnect = mongoConnect;
