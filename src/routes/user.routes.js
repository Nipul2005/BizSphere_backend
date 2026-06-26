import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlware.js";

import {
  signUp,
  logout,
  login,
  getCurrentUser,
  createService,
} from "../controllers/user.controller.js";
import bizShpereImagesHandler from "../multer/upload.multer.js";

const userRouter = Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(authMiddleware, logout);
userRouter.route("/guess").post(authMiddleware, getCurrentUser);
userRouter
  .route("/createService")
  .post(authMiddleware, bizShpereImagesHandler.array("files", 5), createService);

export default userRouter;
