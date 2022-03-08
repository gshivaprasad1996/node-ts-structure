import { Router, Response, Request } from 'express';
import { PostService } from '../services/post.service';

export class PostController {
    public router: Router;
    public postService: PostService = new PostService();

    constructor() {
        this.router = Router();
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const posts = await this.postService.index();
        res.send(posts);
    };

    public create = async (req: Request, res: Response) => {
        console.log(req.body);
        const post = await this.postService.create({
            title: req.body.title,
            content: req.body.content,
        });
        return res.json(post);
    };

    public update(req: Request, res: Response) {
        res.send(this.postService.update());
    }

    public delete(req: Request, res: Response) {
        res.send(this.postService.delete());
    }

    /**
     * Configure the routes of controller
     */
    public routes() {
        this.router.get('/', this.index);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}
