import { Request, Response, Router } from 'express';

import Post from '../Models/Post';

class PostRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getPosts( req: Request, res: Response ): Promise<void> {
        const posts = await Post.find();
        res.json( posts );
    }

    public async getPost( req: Request, res: Response ): Promise<any> {
        const { url } = req.params;
        const post = await Post.findOne({ url });
        if( !post ) {
            return res.status( 404 ).json({ message: 'Post not found' });
        }
        res.json( post );
    }

    public async createPost( req: Request, res: Response ): Promise<void> {
        const { title, url, content, imagen } = req.body;
        const newPost = new Post( { title, url, content, imagen } );
        await newPost.save();
        res.json({ data: newPost });
    }

    public async updatePost( req: Request, res: Response ): Promise<any> {
        const { url } = req.params;
        const post = await Post.findOneAndUpdate({ url }, req.body, { new: true });
        if( !post ) {
            return res.status( 404 ).json({ message: 'Post not found' });
        }
        res.json( post );
    }

    public async deletePost( req: Request, res: Response ): Promise<any> {
        const { url } = req.params;
        const post = await Post.findOneAndDelete({ url });
        if( !post ) {
            return res.status( 404 ).json({ message: 'Post not found' });
        }
        res.json({ response: 'Post Deleted Successfully', post });
    }

    routes() {
        this.router.get( '/', this.getPosts );
        this.router.get( '/:url', this.getPost );
        this.router.post( '/', this.createPost );
        this.router.put( '/:url', this.updatePost );
        this.router.delete( '/:url', this.deletePost );
    }
}

const postRoutes = new PostRoutes();
export default postRoutes.router;