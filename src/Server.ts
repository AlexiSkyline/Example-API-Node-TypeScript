import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import indexRoutes from './Routes/IndexRoutes';

class Server {
    private app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set( 'port', process.env.PORT || 4000 );
        // * Middlewares
        this.app.use( morgan( 'dev' ) );
        this.app.use( helmet() );
    }

    routes() {
        this.app.use( indexRoutes );
    }

    start() {
        this.app.listen( this.app.get( 'port' ), () => {
            console.log( 'Server on port', this.app.get( 'port' ) );
        });
    }
}
import IndexRoutes from './Routes/IndexRoutes';

const server = new Server();
server.start();