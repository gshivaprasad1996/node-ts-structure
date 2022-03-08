import { Application } from 'express';
import express = require('express');
import { pgConnPool } from './config/orm.config';
import { PostController } from './controllers/post.controller';
import { UserRouter } from './routes/user.router';
import swaggerJsdoc = require('swagger-jsdoc');
import * as swaggerUi from 'swagger-ui-express';
import bodyParser = require('body-parser');
import * as dotenv from 'dotenv';
import { authentication } from './validations/auth';
import { createServer, Server } from 'http';
import { Server as chatServer } from 'socket.io';
import cors = require('cors');
import { CorsOptions } from 'cors';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
    },
};

const options: swaggerUi.SwaggerOptions = {
    swaggerDefinition,
    //Paths to files containing Open API definitions
    apis: ['./dist/**/*router.js'],
};

class App {
    private app: Application;
    private postController: PostController;
    private userRouter: UserRouter;
    private swaggerSpec = swaggerJsdoc(options);
    private httpServer: Server;

    constructor() {
        dotenv.config();
        //init the application
        this.app = express();
        this.httpServer = createServer(this.app);
        this.configuration();
        this.app.use(cors());

        this.postController = new PostController();
        this.userRouter = new UserRouter();
        this.routes();
    }

    /**
     * Method to configure the server,
     * If we didn't configure the port into the development
     * variables it takes the default port 3000
     */
    public async configuration() {
        this.app.set('port', process.env.PORT || 4000);
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        const io = new chatServer();

        const corsOpts: CorsOptions = {
            origin: 'http://localhost:3000',
        };

        io.attach(this.httpServer, {
            cors: corsOpts,
            path: '/connect-socket',
        });

        io.on('connection', (socket) => {
            console.log('socket connected..');
            socket.emit('fromServer', 'Hey i am from server...');
            socket.on('fromClient', (msg) => {
                console.log('Message from client', msg);
            });
        });

        //Connecting to database
        await pgConnPool();

        //Setting up swagger ui docs page
        await this.app.use(
            '/api/docs',
            swaggerUi.serve,
            swaggerUi.setup(this.swaggerSpec)
        );

        this.app.use('/', (req, res) => {
            res.sendFile(__dirname + '/public/index.html');
        });
    }

    /**
     * Method to configure the routes
     */
    public async routes() {
        this.app.use(authentication);
        this.app.use('/api/posts', this.postController.router);
        this.app.use('/api/users', this.userRouter.router);
    }

    /**
     * Used to start the server
     */
    public start() {
        this.httpServer.listen(
            this.app.get('port'),
            async (): Promise<void> => {
                console.log(`Server is listening ${this.app.get('port')} port`);
            }
        );
    }
}

const app = new App();
app.start();
