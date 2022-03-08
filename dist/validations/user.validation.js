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
exports.UserValidator = void 0;
const validator_1 = __importDefault(require("validator"));
const UserFields = ['username', 'firstname', 'lastname', 'email', 'password'];
class UserValidator {
    constructor() {
        this.start = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userObj = req.body;
            const missingFields = yield this.checkMissingFields(userObj);
            if (missingFields.length > 0) {
                res.send({
                    message: 'Missing Required fields',
                    fields: missingFields,
                });
            }
            const errorMessages = yield this.validateFields(userObj);
            if (errorMessages.length > 0) {
                res.send({
                    message: 'Invalid information',
                    fields: errorMessages,
                });
            }
            next();
        });
    }
    checkMissingFields(userObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const missedFields = [];
            yield UserFields.forEach((value) => {
                //Reading object value with variable value
                if (userObj[value] === undefined) {
                    missedFields.push(value);
                }
            });
            return missedFields;
        });
    }
    validateFields(userObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const validEmail = yield validator_1.default.isEmail(userObj.email);
            if (!validEmail) {
                return ['Please provide a valid email'];
            }
            else {
                return [];
            }
        });
    }
}
exports.UserValidator = UserValidator;
