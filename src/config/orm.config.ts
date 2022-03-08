import { Connection, createConnection } from 'typeorm';
import { PostEntity } from '../models/post.entity';
import { UserEntity } from '../models/user.entity';

export async function pgConnPool(): Promise<Connection> {
    return await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123',
        database: 'blog',
        entities: [PostEntity, UserEntity],
        synchronize: true,
    });
}
