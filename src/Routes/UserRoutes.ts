import { Request, Response, Router } from 'express';

import User from '../Models/User';

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getUsers( req: Request, res: Response ): Promise<void> {
        const user = await User.find();
        res.json( user );
    }

    public async getUser( req: Request, res: Response ): Promise<any> {
        const user = await User.findOne({ username: req.params.username }).populate( 'post', 'title url -_id' );
        res.json( user );
    }

    public async createUser( req: Request, res: Response ): Promise<void> {
        const newUser = new User( req.body );
        await newUser.save();
        res.json({ data: newUser });
    }

    public async updateUser( req: Request, res: Response ): Promise<any> {
        const { username } = req.params;
        const user = await User.findOneAndUpdate({ username }, req.body, { new: true });
        res.json( user );
    }

    public async deleteUser( req: Request, res: Response ): Promise<any> {
        const { username } = req.params;
        const user = await User.findOneAndDelete({ username });
        res.json({ response: 'User Deleted Successfully', user });
    }

    routes() {
        this.router.get( '/', this.getUsers );
        this.router.get( '/:username', this.getUser );
        this.router.post( '/', this.createUser );
        this.router.put( '/:username', this.updateUser );
        this.router.delete( '/:username', this.deleteUser );
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;