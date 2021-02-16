import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { connect as databaseSetup } from './config/database/setup';
import cors from './middlewares/cors';
import { middleware as graphQLMiddleware } from './lib/graphql/server';
import './config/env';

databaseSetup();

const app = express();

app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(graphQLMiddleware);

export default app;
