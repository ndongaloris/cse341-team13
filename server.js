require("dotenv").config(); // Loads environment variables from a .env file into process.env
const session = require("express-session");
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routers/index"); // Imports the main router containing all routes
require("./database/connect"); // Connects to MongoDB
const bodyParser = require("body-parser"); // Import body-parser (if not using built-in)

// Middleware setup
app.use(cors())
.use(express.json())
.use(express.urlencoded({ extended: true }))
.use(bodyParser.json()) // Use body-parser middleware (if not using built-in)
.use("/", router);
     // Mounts all routes defined in the router under the root (/) endpoint

// Environment variables setup
const PORT = process.env.PORT || 8080; // Sets the port for the server, defaults to 8080 if not specified in .env
const HOST = process.env.HOST || "localhost"; // Sets the host for the server, defaults to localhost if not specified in .env

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});
