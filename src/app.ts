import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import '@config/env';
import { connect as databaseSetup } from '@config/database/setup';
import cors from '@lib/middlewares/cors';
import { middleware as graphQLMiddleware } from '@lib/graphql/server';

databaseSetup();

const app = express();

app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(graphQLMiddleware);

export default app;
