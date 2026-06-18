import ApiResponse from "../utils/ApiResponse.utils.js";
import asyncHandler from "../utils/AsyncHandler.utils.js";

const healthCheck = asyncHandler(async (req, res) => {
  res.send(new ApiResponse(200, "success"));
});

export default healthCheck;
