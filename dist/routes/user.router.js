"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../validations/auth");
const user_validation_1 = require("../validations/user.validation");
class UserRouter {
    constructor() {
        this.userController = new user_controller_1.UserController();
        this.userValidator = new user_validation_1.UserValidator();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    /**
     * Configure the routes of controller
     */
    routes() {
        /**
         * @swagger
         * /users:
         *   get:
         *     summary: Retrieve a list of JSONPlaceholder users
         *     description: Retrieve a list of users from JSONPlaceholder.
         */
        this.router.get('/', auth_1.authentication, this.userController.index);
        /**
         * @swagger
         * /users:
         *   post:
         *     summary: Retrieve a list of JSONPlaceholder users
         *     description: Retrieve a list of users from JSONPlaceholder.
         */
        this.router.post('/register', this.userValidator.start, this.userController.create);
        this.router.post('/login', this.userController.login);
        this.router.put('/:id', this.userController.update);
        this.router.delete('/:id', this.userController.delete);
        this.router.post('/protected', this.userController.protected);
    }
}
exports.UserRouter = UserRouter;
