import { config } from "dotenv";
config();

export const MONGO_URL = process.env.MONGO_DB_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const DEV_URL = process.env.DEV_URL;
export const PROD_URL = process.env.PROD_URL;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const jwtAccessTokenExpiry = "15m";
export const jwtRefreshTokenExpiry = "30d";
export const CLOUDINARY_API_KEY =process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME


