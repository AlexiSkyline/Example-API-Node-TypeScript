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
        
    }

    public async createUser( req: Request, res: Response ): Promise<void> {
        
    }

    public async updateUser( req: Request, res: Response ): Promise<any> {
        
    }

    public async deleteUser( req: Request, res: Response ): Promise<any> {
        
    }

    routes() {
        this.router.get( '/', this.getUsers );
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;