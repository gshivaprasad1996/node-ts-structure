"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jwt = require("jsonwebtoken");
const skipPaths = ['/', '/api/users/login', '/api/users/register'];
/**
 * @param authentication
 * Authenticate the routes by chekcing provided json web tokens
 */
const authentication = (req, res, next) => {
    //If if the path is login or register dont check for the token
    if (skipPaths.includes(req.path)) {
        return next();
    }
    let bearerToken;
    if (req.headers.authorization) {
        bearerToken = req.headers.authorization.split(' ')[1];
        try {
            jwt.verify(bearerToken, process.env.secret);
            next();
        }
        catch (err) {
            //const error = err as Error;
            return res.json(err);
        }
    }
    else {
        return res.json({
            message: 'Please provide the token',
        });
    }
};
exports.authentication = authentication;
