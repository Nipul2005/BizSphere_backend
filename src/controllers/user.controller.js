import User from "../models/user.model.js";
import asynchandler from "../utils/AsyncHandler.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import ApiError from "../utils/ApiError.utils.js";

const SignUp = asynchandler(async (req, res) => {
  res.send(new ApiResponse(200, "success", req.body));
});

export { SignUp };
