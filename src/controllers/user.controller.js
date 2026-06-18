import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import ApiError from "../utils/ApiError.utils.js";
import { accessTokenOption, refreshTokenOption } from "../constants.js";
import { expireToken } from "../constants.js";

//signyp
export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, type } = req.body;

  const isExist = await User.findOne({ email });

  if (isExist) {
    throw new ApiError("User already exists, Please login", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    type,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError("Failed to create your account", 500);
  }

  const accesstoken = await createdUser.generateAccessToken();
  const refreshtoken = await createdUser.generateRefreshToken();

  return res
    .status(201)
    .cookie("accessToken", accesstoken, accessTokenOption)
    .cookie("refreshToken", refreshtoken, refreshTokenOption)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

// login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError("Email or password is incorrect", 400);
  }

  const isMatch = await user.comparePassword(password);

  if(!isMatch) {
    throw new ApiError("Email or password is incorrect", 400);
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  return res
  .status(200)
  .cookie("accessToken", accessToken, accessTokenOption)
  .cookie("refreshToken", refreshToken, refreshTokenOption)
  .json(new ApiResponse(200, "success", user));
});

//logout
export const logout = asyncHandler(async (req, res) => {
  console.log("getting request from logout");
  return res
    .status(200)
    .clearCookie("accessToken", expireToken)
    .clearCookie("refreshToken", expireToken)
    .json(new ApiResponse(200, "User logged out successfully"));
});

//guess current user

