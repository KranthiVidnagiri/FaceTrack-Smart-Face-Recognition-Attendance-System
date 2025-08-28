"use strict";

const errorHandler = (err, req, res, next) => {
  // Log error stack only in development
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack || err.message);
  }

  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  // Handle known errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

module.exports = errorHandler;
