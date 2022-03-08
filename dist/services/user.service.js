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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../models/user.entity");
class UserService {
    constructor() {
        this.index = () => __awaiter(this, void 0, void 0, function* () {
            console.log('Reading posts..');
            const posts = yield (0, typeorm_1.getRepository)(user_entity_1.UserEntity).find();
            return posts;
        });
        this.create = (reqBody) => __awaiter(this, void 0, void 0, function* () {
            console.log('Creating User..');
            try {
                const newUser = yield (0, typeorm_1.getRepository)(user_entity_1.UserEntity).save(reqBody);
                return newUser;
            }
            catch (e) {
                console.log('Bad data...');
            }
        });
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const userFound = yield (0, typeorm_1.getRepository)(user_entity_1.UserEntity).findOne({
                email: email,
            });
            if (userFound)
                return userFound;
            if (!userFound)
                return 404;
        });
        this.update = () => {
            return 'Update from service';
        };
        this.delete = () => {
            return 'Delete from service';
        };
        this.login = (email) => __awaiter(this, void 0, void 0, function* () {
            const userFound = yield (0, typeorm_1.getRepository)(user_entity_1.UserEntity).findOne({
                email: email,
            });
            if (userFound)
                return userFound;
            if (!userFound)
                return [];
        });
    }
}
exports.UserService = UserService;
