import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authentication } from '../validations/auth';
import { UserValidator } from '../validations/user.validation';

export class UserRouter {
    public router: Router;
    public userController: UserController = new UserController();
    public userValidator: UserValidator = new UserValidator();

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * Configure the routes of controller
     */
    public routes() {
        /**
         * @swagger
         * /users:
         *   get:
         *     summary: Retrieve a list of JSONPlaceholder users
         *     description: Retrieve a list of users from JSONPlaceholder.
         */
        this.router.get('/', authentication, this.userController.index);

        /**
         * @swagger
         * /users:
         *   post:
         *     summary: Retrieve a list of JSONPlaceholder users
         *     description: Retrieve a list of users from JSONPlaceholder.
         */
        this.router.post(
            '/register',
            this.userValidator.start,
            this.userController.create
        );

        this.router.post('/login', this.userController.login);
        this.router.put('/:id', this.userController.update);
        this.router.delete('/:id', this.userController.delete);
        this.router.post('/protected', this.userController.protected);
    }
}
