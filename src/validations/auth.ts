import { RequestHandler } from 'express';
import jwt = require('jsonwebtoken');
const skipPaths = ['/', '/api/users/login', '/api/users/register'];
/**
 * @param authentication
 * Authenticate the routes by chekcing provided json web tokens
 */
export const authentication: RequestHandler = (req, res, next) => {
    //If if the path is login or register dont check for the token
    if (skipPaths.includes(req.path)) {
        return next();
    }

    let bearerToken: string;
    if (req.headers.authorization) {
        bearerToken = req.headers.authorization.split(' ')[1];
        try {
            jwt.verify(bearerToken, process.env.secret!);
            next();
        } catch (err) {
            //const error = err as Error;
            return res.json(err);
        }
    } else {
        return res.json({
            message: 'Please provide the token',
        });
    }
};
