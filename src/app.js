import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./utils/corsOptions.js";
import path from "path";
import globalErrors from "./middlewares/globalError.midleware.js";

export const app = express();
app.use(cors(corsOptions));
app.options("/*splat", cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join("public")));

// routes declaration
import healthCheckRouter from "./routes/healthCheck.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/", healthCheckRouter);
app.use("/", userRouter);
app.use(globalErrors);
