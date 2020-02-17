import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';

// Graphql
import { graphql, buildSchema } from 'graphql';
import graphqlHTPP from 'express-graphql';

// Customer Middlewares
import { handleError } from './middlewares/default';

// Express Server
const server = express();

// Install Middlewares
server.use(cors());
server.use(helmet());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(morgan('dev'));

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const resolver = {
  hello: () => {
    return 'Hello world!';
  },
};

// Install Graphql
server.use(
  '/graphql',
  graphqlHTPP({
    schema,
    rootValue: resolver,
    graphiql: true,
  }),
);

// Install Self Middlewares
server.use(handleError);

export default server;
