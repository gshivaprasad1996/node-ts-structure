import { Response, Request } from 'express';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');

export class UserController {
    public userService: UserService = new UserService();

    public index = async (req: Request, res: Response) => {
        const posts = await this.userService.index();
        res.send(posts);
    };

    public create = async (req: Request, res: Response) => {
        const newUser: User = req.body;
        const userFound = await this.userService.getUserByEmail(newUser.email);
        //If user not exists in the database then create
        if (userFound === 404) {
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(newUser.password, salt);
            newUser.password = hash;

            try {
                const post = await this.userService.create(newUser);
                return res.json(post);
            } catch (e) {
                console.log(e);
            }
        } else {
            return res.json({
                message: 'User already exists with the details you entered',
            });
        }
    };

    public update(req: Request, res: Response) {
        res.send(this.userService.update());
    }

    public delete(req: Request, res: Response) {
        res.send(this.userService.delete());
    }

    public login = async (req: Request, res: Response) => {
        type UserCreds = {
            email: string;
            password: string;
        };
        const { email, password } = req.body as UserCreds;
        //Find user by email
        const userFound = await this.userService.getUserByEmail(email);
        if (userFound === 404) {
            res.json({
                message: 'User not found with the email',
            });
        } else {
            //password check
            const hashPassword = userFound?.password ?? '';
            const secret: string = await process.env.secret!;
            const passwordMatched = await bcrypt.compareSync(
                password,
                hashPassword
            );
            if (passwordMatched) {
                const token = jwt.sign(
                    { email: email, password: password },
                    secret,
                    {
                        expiresIn: '60000',
                    }
                );
                res.json({
                    token: token,
                });
            } else {
                console.log('password not matched');
            }
        }
    };

    public protected = async (req: Request, res: Response) => {
        console.log('this is a protected route...');

        return res.json({
            message: 'Response from protected route >>>>',
        });
    };
}
