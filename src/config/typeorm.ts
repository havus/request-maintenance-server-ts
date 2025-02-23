import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { Task } from '../entity/Task';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, Task],
  migrations: [
    "src/migration/*.ts",
  ],
  subscribers: [
    "src/subscriber/*.ts",
  ],
});
