import { DEV_URL, PROD_URL, NODE_ENV } from "./utils/Env.js";

export const accessTokenOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "prod",
  sameSite: "None",
  maxAge: 1000 * 60 * 20, // 20 minutes
};

export const refreshTokenOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "prod",
  sameSite: "None",
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
};

export const expireToken = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "prod",
  sameSite: "None",
};

export const DB_Name = "BizSphere";
export const allowedOrigins = [DEV_URL, PROD_URL];
