import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';

// Middlewares
import { handleError } from './middlewares/default';

// Routers
import UserRouter from './routes/user.router';

// Express Server
const server = express();

// Install Middlewares
server.use(cors());
server.use(helmet());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(morgan('dev'));

// Install Routers
server.use(UserRouter);

// Install Middlewares
server.use(handleError);

export default server;
