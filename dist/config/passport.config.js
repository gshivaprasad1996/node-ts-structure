"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePassport = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = __importDefault(require("passport"));
const initializePassport = (req, res, next) => {
    console.log('Passort checking...');
    passport_1.default.use(new passport_local_1.Strategy(function (username, password, done) {
        return done(null, false, { message: 'Incorrect username.' });
        //return done(null, false, { message: 'Incorrect password.' });
        //return done(null, 'user');
    }));
    //next();
};
exports.initializePassport = initializePassport;
