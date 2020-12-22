import express, { json } from 'express';
import morgan from 'morgan';
import bodyParse from 'body-parser';
import cors from 'cors';
import path from 'path';
import url from 'url';
import querystring from 'querystring';

import db from './config/database';

import routes from './routes';


db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error DB => ', err));

const server = express();


server.use(cors());
server.use(morgan('dev'));
server.use(bodyParse.json());
server.use('/api', routes);

export default server;
