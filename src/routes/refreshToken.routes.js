import { Router } from "express";
import { refreshAccessToken } from "../controllers/refreshToken.controller.js";

const refreshTokenRoute = Router();

refreshTokenRoute.route("/refreshToken").post(refreshAccessToken);

export default refreshTokenRoute
