import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { handleError } from './middlewares';
import UserRouter from './routes/user.router';

const server = express();

// Install Middlewares
server.use(cors());
server.use(helmet());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(morgan('dev'));

// Install Routes
server.use(UserRouter);

// Install Self Middlewares
server.use(handleError);

export default server;
