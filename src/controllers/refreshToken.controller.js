import asyncHandler from "../utils/AsyncHandler.utils.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET } from "../utils/Env.js";
import { accessTokenOption, refreshTokenOption } from "../constants.js";

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw new ApiError("Credentials not found", 401, "CREDENTIAL_NOT_FOUND");
  }

  let decoded;

  try {
    decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  } catch (error) {
    throw new ApiError("Please login again", 401, "LOGIN_AGAIN");
  }

  const user = await User.findById(decoded._id).select("+refreshToken");

  if (!user) {
    throw new ApiError("User not found", 401, "USER_NOT_FOUND");
  }

  // Prevent use of old/stolen refresh tokens
  if (user.refreshToken !== refreshToken) {
    throw new ApiError("refresh token not matched", 401, "INVALID_REFRESH_TOKEN");
  }

  const newAccessToken = await user.generateAccessToken();
  const newRefreshToken = await user.generateRefreshToken();

  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .cookie("accessToken", newAccessToken, accessTokenOption)
    .cookie("refreshToken", newRefreshToken, refreshTokenOption)
    .json(new ApiResponse(200, {}, "Access token refreshed successfully"));
});
