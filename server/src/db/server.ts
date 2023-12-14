import { Pool, PoolConfig } from "pg";
import { config } from "dotenv";
config();

const poolConfig: PoolConfig = {
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: Number(process.env.port),
};

const pool = new Pool(poolConfig);

export default pool;
