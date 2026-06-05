import { Router } from "express";
import { SignUp } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/signup").post(SignUp);

export default userRouter;
