const router = require("express").Router();
const institutionRouter = require("./institution");
const degreeRouter = require("./degree");

const certificateRouter = require("./certificate");
const courseRouter = require("./course");

const userRouter = require("./user");

const swagger = require("./swagger");
const errorHandler = require("../middleware/errorHandler");
const AppErrorClass = require("../utils/appErrorClass");

// Mounting swagger routes under /api-docs endpoint
router.use("/", swagger);

// Mounting degree routes under /degree endpoint
router.use("/degrees", degreeRouter);

// Mounting institution routes under /institution endpoint
router.use("/institutions", institutionRouter);


// Mounting degree routes under /degree endpoint
router.use("/courses", courseRouter);

// Mounting institution routes under /institution endpoint
router.use("/certificates", certificateRouter);

//* Mounting the User route under /user endpoint
router.use("/users", userRouter);


// Default route handler for the root endpoint
router.get("/", (req, res) => {
  res.send("So far so good");
});

/**
 * * This route catches all undefined routes and forwards an error to the error handling middleware.
 * *
 * * This middleware function is used to handle cases where a client requests a route that does not exist.
 * * It creates a new `AppErrorClass` instance with a message indicating the route was not found and a 404 status code,
 * * then forwards this error to the next middleware in the stack, which the error handling middleware will handle.
 *
 * * @function
 * * @param {object} req - The Express request object.
 * * @param {object} res - The Express response object.
 * * @param {function} next - The Express next middleware function.
 * * @returns {void}
 */
router.all("*", (req, res, next) => {
  next(new AppErrorClass(`Can't find ${req.originalUrl} on this server!`, 404));
});

router.use(errorHandler.errorHandler);

module.exports = router;
