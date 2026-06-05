import { config } from "dotenv";
config();

const MONGO_URL = process.env.MONGO_DB_URL;
const NODE_ENV = process.env.NODE_ENV;
const DEV_URL = process.env.DEV_URL;
const PROD_URL = process.env.PROD_URL;

export { MONGO_URL, NODE_ENV, DEV_URL, PROD_URL };
