/**
 ** @file errorHandler.js
 ** @description This file contains the error handling middleware for the API.
 ** The middleware captures errors, logs them, and sends a standardized JSON response.
 ** @author Samuel Turay
 */

const AppErrorClass = require("../utils/appErrorClass"); //* Importing AppError class

/**
 * * This functions handles errors that occurs when a value
 * * provided by the user for a field does not match the expected
 * * data type. Such as if the user provides an array instead of a string.
 *
 * * @param {Error} err - The error object.
 * * @returns {Object} - A formatted object containing the error message and status code.
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppErrorClass(message, 400);
};

/**
 * * This function handles invalid or malformed JWT in the application
 * * and create a new error object.
 *
 * * @returns {void}
 */
const handleJWTError = () =>
  new AppErrorClass("Invalid token. Please log in again!", 401);

/**
 * * This function handles expired JWT in the application
 * * and create a new error object.
 *
 * * @returns {void}
 */
const handleJWTExpiredError = () =>
  new AppErrorClass("Your token has expired. Please log in again!", 401);

/**
 * * This function logs/returns a detailed error message for the development environment
 * * for debugging purposes.
 *
 * * @param {Error} err - The error object.
 * * @param {object} res - Express response object.
 */
const handleErrorInDevEnv = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * * This function returns a minimal error message for the production environment.
 * * It checks if the error is operational and sends the appropriate response.
 * * If not, it sends a generic error message with a 500 status code.
 *
 * * @param {Error} err - The error object.
 * * @param {object} res - Express response object.
 */
const handleErrorInProdEnv = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("Error", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

/**
 * * This function is the central error handler for the API.
 * * It captures errors, and sends or logs them based on the environment.
 * * If the environment is `development` is calls the `handleErrorInDevEnv` function.
 * * If the environment is `production` it calls the `handleErrorInProdEnv` function.
 * * Also checks for the `CastError` and `JsonWebTokenError` and `TokenExpiredError`
 *
 *
 * * @param {Error} err - The error object.
 * * @param {object} req - Express request object.
 * * @param {object} res - Express response object.
 * * @param {function} next - Express next middleware function.
 */
exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    handleErrorInDevEnv(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    handleErrorInProdEnv(error, res);
  }
};

/**
 * * This is a higher-order function that wraps an asynchronous function for route handlers and middlewares,
 * * catching any errors that occur and passing them to the next middleware.
 *
 * * This function is particularly useful for handling errors in async route handlers, ensuring
 * * that any errors are properly caught and forwarded to the error handling middleware.
 *
 * * @function catchAsync
 * * @param {Function} fn - The asynchronous function to wrap. It should return a promise.
 * * @returns {Function} A function that takes Express.js req, res, and next parameters,
 *                     and calls the provided function, catching and forwarding any errors.
 * * @example
 * // Example usage in an Express route
 * * const getAll = catchAsync(async (req, res, next) => {
 * *     const data = await someAsyncFunction();
 * *     res.json(data);
 * * }));
 */
exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
