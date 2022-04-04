import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

class Server {
    private app: Application;
    
    constructor() {
        this.app = express();

        this.config();
    }

    config() {
        this.app.set('port', process.env.PORT || 4000);
        // * Middlewares
        this.app.use(morgan( 'dev' ));
        this.app.use(helmet());
    }

    routes() {

    }

    start() {
        this.app.listen( this.app.get( 'port' ), () => {
            console.log('Server on port', this.app.get( 'port' ));
        });
    }
}

const server = new Server();
server.start();