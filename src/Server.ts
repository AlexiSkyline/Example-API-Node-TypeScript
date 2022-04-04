import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

import indexRoutes from './Routes/IndexRoutes';

class Server {
    private app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        const MONGO_URI: string = 'mongodb://localhost:27017/resapit' || process.env.MONGO_URI;
        mongoose.connect( MONGO_URI, ( error ) => {
            if( error ) {
                console.log(error);
                process.exit(1);
            }
            console.log( 'DB is connect' );
        });

        // * Settings
        this.app.set( 'port', process.env.PORT || 4000 );
        // * Middlewares
        this.app.use( morgan( 'dev' ) );
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: false }) );
        this.app.use( helmet() );
        this.app.use( compression() );
        this.app.use( cors() );
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

const server = new Server();
server.start();