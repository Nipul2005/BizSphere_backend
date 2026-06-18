import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlware.js";
import {
  signUp,
  logout,
  login,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
// userRouter.route("/guess").get(getCurrentUser);

export default userRouter;
