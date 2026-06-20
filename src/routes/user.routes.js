import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlware.js";

import {
  signUp,
  logout,
  login,
  getCurrentUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(authMiddleware, logout);
userRouter.route("/guess").post(authMiddleware, getCurrentUser);

export default userRouter;
