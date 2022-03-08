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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../models/user.entity");
//import bcrypt = require('bcrypt');
function initializePassport() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Initializing ....');
        // const authenticateUser = async (
        //     email: string,
        //     password: string,
        //     done: any
        // ) => {
        //     const user = await getRepository(UserEntity).findOne(8);
        //     console.log(user);
        //     //return done(null, user, { message: 'done' });
        //     return 'done';
        //     // if (user == null) {
        //     //     return done(null, false, { message: 'No User with that email' });
        //     // }
        //     // try {
        //     //     if (await bcrypt.compare(password, user.password)) {
        //     //         return done(null, user);
        //     //     } else {
        //     //         return done(null, false, { message: 'Password incorrect' });
        //     //     }
        //     // } catch (e) {
        //     //     return done(e);
        //     // }
        // };
        // await passport.use(
        //     new Strategy(
        //         {
        //             usernameField: 'email',
        //             passwordField: 'password',
        //         },
        //         authenticateUser
        //     )
        // );
        // passport.serializeUser(function (user, done) {
        //     // done(null, user.id);
        //     done(null, 8);
        // });
        // passport.deserializeUser(function (id, done) {
        //     // User.findById(id, function (err, user) {
        //     //     done(err, user);
        //     // });
        //     done(null, 8);
        // });
        passport_1.default.use(new passport_local_1.Strategy({}, function (username, password, done) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield (0, typeorm_1.getRepository)(user_entity_1.UserEntity).findOne(8);
                    if (!user) {
                        return done(null, false, {
                            message: 'Incorrect username.',
                        });
                    }
                    else {
                        return done(null, user);
                    }
                }
                catch (e) {
                    return done(null, false, {
                        message: 'Incorrect password.',
                    });
                }
            });
        }));
    });
}
exports.initializePassport = initializePassport;
