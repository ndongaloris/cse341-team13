// Require necessary modules
const router = require("express").Router(); // Express router instance
const swaggerUi = require("swagger-ui-express"); // Swagger UI middleware
const swaggerDocument = require("../models/swagger.json"); // Path to Swagger JSON file

// Serve Swagger UI at "/api-docs"
router.use("/api-docs", swaggerUi.serve);

// Setup Swagger UI to use the provided Swagger JSON document
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

// Export the router to be used elsewhere in the application
module.exports = router;
