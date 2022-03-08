"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express = require("express");
const orm_config_1 = require("./config/orm.config");
const post_controller_1 = require("./controllers/post.controller");
const user_router_1 = require("./routes/user.router");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = __importStar(require("swagger-ui-express"));
const bodyParser = require("body-parser");
const dotenv = __importStar(require("dotenv"));
const auth_1 = require("./validations/auth");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors = require("cors");
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
    },
};
const options = {
    swaggerDefinition,
    //Paths to files containing Open API definitions
    apis: ['./dist/**/*router.js'],
};
class App {
    constructor() {
        this.swaggerSpec = swaggerJsdoc(options);
        dotenv.config();
        //init the application
        this.app = express();
        this.httpServer = (0, http_1.createServer)(this.app);
        this.configuration();
        this.app.use(cors());
        this.postController = new post_controller_1.PostController();
        this.userRouter = new user_router_1.UserRouter();
        this.routes();
    }
    /**
     * Method to configure the server,
     * If we didn't configure the port into the development
     * variables it takes the default port 3000
     */
    configuration() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.set('port', process.env.PORT || 4000);
            this.app.use(express.json());
            this.app.use(bodyParser.urlencoded({ extended: true }));
            const io = new socket_io_1.Server();
            const corsOpts = {
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
            yield (0, orm_config_1.pgConnPool)();
            //Setting up swagger ui docs page
            yield this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerSpec));
            this.app.use('/', (req, res) => {
                res.sendFile(__dirname + '/public/index.html');
            });
        });
    }
    /**
     * Method to configure the routes
     */
    routes() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(auth_1.authentication);
            this.app.use('/api/posts', this.postController.router);
            this.app.use('/api/users', this.userRouter.router);
        });
    }
    /**
     * Used to start the server
     */
    start() {
        this.httpServer.listen(this.app.get('port'), () => __awaiter(this, void 0, void 0, function* () {
            console.log(`Server is listening ${this.app.get('port')} port`);
        }));
    }
}
const app = new App();
app.start();
