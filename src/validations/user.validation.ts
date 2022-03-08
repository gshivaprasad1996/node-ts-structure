import { RequestHandler } from 'express';
import validator from 'validator';
import { User } from '../interfaces/user.interface';

const UserFields = ['username', 'firstname', 'lastname', 'email', 'password'];

export class UserValidator {
    start: RequestHandler = async (req, res, next) => {
        const userObj: User = req.body;
        const missingFields: string[] = await this.checkMissingFields(userObj);
        if (missingFields.length > 0) {
            res.send({
                message: 'Missing Required fields',
                fields: missingFields,
            });
        }
        const errorMessages: string[] = await this.validateFields(userObj);
        if (errorMessages.length > 0) {
            res.send({
                message: 'Invalid information',
                fields: errorMessages,
            });
        }
        next();
    };

    async checkMissingFields(userObj: any) {
        const missedFields: string[] = [];
        await UserFields.forEach((value) => {
            //Reading object value with variable value
            if (userObj[value] === undefined) {
                missedFields.push(value);
            }
        });
        return missedFields;
    }

    async validateFields(userObj: User) {
        const validEmail: boolean = await validator.isEmail(userObj.email);
        if (!validEmail) {
            return ['Please provide a valid email'];
        } else {
            return [];
        }
    }
}
