import ApiResponse from "../utils/ApiResponse.utils.js";
import asynchandler from "../utils/AsyncHandler.utils.js";

const healthCheck = asynchandler(async (req, res) => {
  res.send(new ApiResponse(200, "success"));
});

export default healthCheck;
