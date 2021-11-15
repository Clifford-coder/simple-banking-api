import dotenv from 'dotenv';
import connectDB from './db/connectDB';

dotenv.config();
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
  } catch (error) {
    console.log(`Error occured in starting server`);
    console.log(error);
  }
};

start();
