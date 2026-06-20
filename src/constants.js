import { DEV_URL, PROD_URL, NODE_ENV } from "./utils/Env.js";

const isProd = process.env.NODE_ENV === "prod";

export const accessTokenOption = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  maxAge: 1000 * 60 * 20,
};

export const refreshTokenOption = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 30,
};

export const expireToken = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
};

export const DB_Name = "BizSphere";
export const allowedOrigins = [DEV_URL, PROD_URL];
