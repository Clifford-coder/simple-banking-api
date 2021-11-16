import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import 'express-async-errors';

import connectDB from './db/connectDB';
import { banker, client } from './routes';
import { errorHandler, routeNotFound } from './middlewares';

dotenv.config();
const app = express();
const PORT = 3000;

//global middlewares
app.use(express.json());
app.use(helmet());

//route middlewares
app.use('/api/v1/client', client);
app.use('/api/v1/banker', banker);

// error midddlewares
app.use(errorHandler);
app.use(routeNotFound);

const start = async () => {
  try {
    console.log('Connecting to the Postgres DB...');
    const connectConfig = {
      host: process.env.PG_HOST,
      port: 5432,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
    };
    await connectDB(connectConfig);
    console.log('Connected to the Postgres DB.');
    app.listen(PORT, () =>
      console.log('Server is now running on http://localhost:' + PORT)
    );
  } catch (error) {
    console.log(`Error occured in starting server`);
    console.log(error);
  }
};

start();
