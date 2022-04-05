import { Request, Response, Router } from 'express';

import Post from '../Models/Post';

class PostRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getPosts( req: Request, res: Response ) {
        const posts = await Post.find();
        res.json( posts );
    }

    getPost( req: Request, res: Response ) {
        res.send( 'Post' );
    }

    async createPost( req: Request, res: Response ) {
        const { title, url, content, imagen } = req.body;
        const newPost = new Post( { title, url, content, imagen } );
        await newPost.save();
        res.json({ data: newPost });
    }

    updatePost( req: Request, res: Response ) {
        res.send( 'UpdatePost' );
    }

    deletePost( req: Request, res: Response ) {
        res.send( 'DeletePost' );
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