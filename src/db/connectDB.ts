import { Connection } from '../types';
import { createConnection } from 'typeorm';
import { Client, Banker, Transaction } from '../entities';

const connectDB = async (config: Connection) => {
  const { host, port, username, password, database } = config;
  await createConnection({
    type: 'postgres',
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    entities: [Client, Banker, Transaction],
    synchronize: true,
  });
};

export default connectDB;
