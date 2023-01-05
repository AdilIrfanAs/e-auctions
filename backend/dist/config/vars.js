"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import .env variables
// import * as dotenv from 'dotenv';
var dotenv = require('dotenv');
dotenv.config();
// JWT_EXPIRATION_MINUTES=525600
// PORT=8081
// MONGO_URI=mongodb://localhost:27017/eauction
// PWD_SALT_ROUNDS=10
// PW_ENCRYPTION_KEY=SDASDMAS_iLkJSGhPi_sjjKIUWBCV_QWEFjkIKJHDFGlSgfsF
var configs = {
    jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES ? parseInt(process.env.JWT_EXPIRATION_MINUTES) : 525600,
    port: process.env.PORT ? parseInt(process.env.PORT) : 8081,
    mongoUri: process.env.MONGO_URI || "",
    pwdSaltRounds: process.env.PWD_SALT_ROUNDS ? parseInt(process.env.PWD_SALT_ROUNDS) : 5,
    pwEncryptionKey: process.env.PW_ENCRYPTION_KEY || "",
    env: process.env.ENVIRONMENT || "development"
};
exports.default = configs;
