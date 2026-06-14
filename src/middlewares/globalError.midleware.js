import { NODE_ENV } from "../utils/Env.js";
const globalErrors = (err, req, res, next) => {
  // Ensure the `errors` property is not recursively nested
  const errors = Array.isArray(err.errors)
    ? err.errors
    : [err.errors].filter(Boolean);

  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    success: false,
    message: err.message || "Internal Server Error",
    errors,
    ...(NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
};

export default globalErrors;
