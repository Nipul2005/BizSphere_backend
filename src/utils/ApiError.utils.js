class ApiError extends Error {
  constructor(
    message = "something went wrong",
    statusCode,
    errors = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Customize JSON serialization
  toJSON() {
    return {
      statusCode: this.statusCode,
      data: this.data,
      success: this.success,
      message: this.message, // Include the message
      errors: this.errors,
    };
  }
}

export default ApiError;
