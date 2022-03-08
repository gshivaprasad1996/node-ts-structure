import { getRepository } from 'typeorm';
import { User } from '../interfaces/user.interface';
import { UserEntity } from '../models/user.entity';

export class UserService {
    public index = async () => {
        console.log('Reading posts..');
        const posts = await getRepository(UserEntity).find();
        return posts;
    };

    public create = async (reqBody: User) => {
        console.log('Creating User..');
        try {
            const newUser = await getRepository(UserEntity).save(reqBody);
            return newUser;
        } catch (e) {
            console.log('Bad data...');
        }
    };

    public getUserByEmail = async (email: string) => {
        const userFound = await getRepository(UserEntity).findOne({
            email: email,
        });
        if (userFound) return userFound;
        if (!userFound) return 404;
    };

    public update = () => {
        return 'Update from service';
    };

    public delete = () => {
        return 'Delete from service';
    };

    public login = async (email: string) => {
        const userFound = await getRepository(UserEntity).findOne({
            email: email,
        });
        if (userFound) return userFound;
        if (!userFound) return [];
    };
}
