/**
 * * This class is used to create custom error objects.
 * * It extends the built-in Error class to add additional properties.
 * * like status code, error message, etc.
 *
 * * @extends {Error}
 */

class AppError extends Error {
  /**
   * * Creates an instance of AppError.
   * *
   * * @param {string} message - The error message.
   * * @param {number} [statusCode=500] - The HTTP status code of the error.
   * * @param {boolean} [isOperational=true] - Whether the error is operational or not. This determine if the error is from the server or not.
   
   */
  constructor(message, statusCode) {
    super(message); //* Calling the message field of the parent class (Error)
    this.statusCode = statusCode; //* Setting the status code
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; //* Setting the status - fail or error
    this.isOperational = true; //* Setting the operational status

    Error.captureStackTrace(this, this.constructor); //* Capturing the stack trace - when an error occurs
  }
}

module.exports = AppError;
