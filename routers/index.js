const router = require("express").Router();
const institutionRouter = require("./institution");
const degreeRouter = require("./degree");
const swagger = require("./swagger");
const errorHandler = require("../middleware/errorHandler");
const AppErrorClass = require("../utils/appErrorClass");
const oauth = require("./oauth.js");
const login = require("./login.js");
const logout = require("./logout.js");
const passport = require("passport");
const static = require("./statics"); // Importing static routes module
const logging = require("../controllers/logging.js");

// Mounting swagger routes under /api-docs endpoint
router.use("/", swagger, oauth);
// Mounting degree routes under /degree endpoint
router.use("/degrees", degreeRouter);

// Mounting institution routes under /institution endpoint
router.use("/institutions", institutionRouter);

router.get("/login", passport.authenticate("github"), login);
router.get("/logout", logout);
// Default route handler for the root endpoint
router.get("/", (req, res) =>{
    res.send(
        req.session.user !== undefined ? `Logged in as ${req.session.user.displayName} <br><a href='/logout'>Log out</a><br><a href='/api-docs'>API Docs</a>` : "<a href='/login'>Login</a>"
    )
  }
)

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
