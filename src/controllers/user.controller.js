import User from "../models/user.model.js";
import asyncHandler from "../utils/AsyncHandler.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import ApiError from "../utils/ApiError.utils.js";
import { accessTokenOption, refreshTokenOption } from "../constants.js";
import { expireToken } from "../constants.js";

//signyp
export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, type, userName } = req.body;

  const isUserNameExist = await User.findByUserNameOrEmail(userName);

  if (isUserNameExist) {
    throw new ApiError(
      "Username already taken",
      409,
      "USERNAME_ALREADY_EXISTS",
    );
  }

  const isExist = await User.findByUserNameOrEmail(email);

  if (isExist) {
    throw new ApiError("Email already exist", 409, "CONFLICT");
  }

  const user = await User.create({
    name,
    email,
    password,
    type,
    userName,
  });

  const accesstoken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return res
    .status(201)
    .cookie("accessToken", accesstoken, accessTokenOption)
    .cookie("refreshToken", refreshToken, refreshTokenOption)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

// login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByUserNameOrEmail(email).select("+password");

  if (!user) {
    throw new ApiError(
      "Email or password is incorrect",
      404,
      "INVALID_CREDENTIAL",
    );
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(
      "Email or password is incorrect",
      404,
      "INVALID_CREDENTIAL",
    );
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.refreshToken;
  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOption)
    .cookie("refreshToken", refreshToken, refreshTokenOption)
    .json(new ApiResponse(200, "success", userObject));
});

//logout
export const logout = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("accessToken", expireToken)
    .clearCookie("refreshToken", expireToken)
    .json(new ApiResponse(200, "User logged out successfully"));
});

//guess current user
export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, "loggedIn", req.user));
});
