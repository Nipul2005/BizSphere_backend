import User from "../models/user.model.js";
import asynchandler from "../utils/AsyncHandler.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import ApiError from "../utils/ApiError.utils.js";
import { accessTokenOption, refreshTokenOption } from "../constants.js";

const SignUp = asynchandler(async (req, res) => {
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

export { SignUp };
