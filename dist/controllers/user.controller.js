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
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.userService.index();
            res.send(posts);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body;
            const userFound = yield this.userService.getUserByEmail(newUser.email);
            //If user not exists in the database then create
            if (userFound === 404) {
                const salt = yield bcrypt.genSaltSync(10);
                const hash = yield bcrypt.hashSync(newUser.password, salt);
                newUser.password = hash;
                try {
                    const post = yield this.userService.create(newUser);
                    return res.json(post);
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                return res.json({
                    message: 'User already exists with the details you entered',
                });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { email, password } = req.body;
            //Find user by email
            const userFound = yield this.userService.getUserByEmail(email);
            if (userFound === 404) {
                res.json({
                    message: 'User not found with the email',
                });
            }
            else {
                //password check
                const hashPassword = (_a = userFound === null || userFound === void 0 ? void 0 : userFound.password) !== null && _a !== void 0 ? _a : '';
                const secret = yield process.env.secret;
                const passwordMatched = yield bcrypt.compareSync(password, hashPassword);
                if (passwordMatched) {
                    const token = jwt.sign({ email: email, password: password }, secret, {
                        expiresIn: '60000',
                    });
                    res.json({
                        token: token,
                    });
                }
                else {
                    console.log('password not matched');
                }
            }
        });
        this.protected = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('this is a protected route...');
            return res.json({
                message: 'Response from protected route >>>>',
            });
        });
    }
    update(req, res) {
        res.send(this.userService.update());
    }
    delete(req, res) {
        res.send(this.userService.delete());
    }
}
exports.UserController = UserController;
