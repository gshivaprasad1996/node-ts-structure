import { getRepository } from 'typeorm';
import { PostEntity } from '../models/post.entity';

export class PostService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}
    public index = async () => {
        console.log('Reading posts..');
        const posts = await getRepository(PostEntity).find();
        return posts;
    };

    public create = async (postBody: { title: string; content: string }) => {
        console.log('Creating post..');
        const { title, content } = postBody;
        const newPost = await getRepository(PostEntity).save({
            title: title,
            content: content,
        });
        return newPost;
    };

    public update = () => {
        return 'Update from service';
    };

    public delete = () => {
        return 'Delete from service';
    };
}
