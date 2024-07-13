const router = require("express").Router();
const institutionRouter = require("./institution");
const degreeRouter = require("./degree");
const swagger = require("./swagger");

// Mounting swagger routes under /api-docs endpoint
router.use("/", swagger);

// Mounting degree routes under /degree endpoint
router.use("/degree", degreeRouter);

// Mounting institution routes under /institution endpoint
router.use("/institution", institutionRouter);

// Default route handler for the root endpoint
router.get("/", (req, res) => {
    res.send("So far so good");
});

module.exports = router;
