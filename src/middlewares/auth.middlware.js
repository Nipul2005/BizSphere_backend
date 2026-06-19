import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "../utils/AsyncHandler.utils.js";
import ApiError from "../utils/ApiError.utils.js";
import { JWT_ACCESS_SECRET } from "../utils/Env.js";

export const authMiddleware = asyncHandler(
  async (req, res, next) => {
    const token = req.cookies?.accessToken;

    // No token provided
    if (!token) {
      throw new ApiError(
        "Credential not found",
        401,
        "TOKEN_MISSING"
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        JWT_ACCESS_SECRET
      );
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new ApiError(
          "Access token expired",
          401,
          "TOKEN_EXPIRED"
        );
      }

      throw new ApiError(
        "Invalid access token",
        401,
        "TOKEN_INVALID"
      );
    }

    const user = await User.findById(
      decoded._id
    ).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(
        "User not found",
        401,
        "USER_NOT_FOUND"
      );
    }

    req.user = user;

    next();
  }
);