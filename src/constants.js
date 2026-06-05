import { DEV_URL, PROD_URL } from "./utils/Env.js";

console.log(DEV_URL, PROD_URL);

export const DB_Name = "BizSphere";
export const allowedOrigins = [DEV_URL, PROD_URL];