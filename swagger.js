// Require the swagger-autogen module
const swaggerAutogen = require("swagger-autogen")();

// Define the basic structure of the Swagger document
const doc = {
  // Swagger version
  swagger: "2.0",
  info: {
    // API version
    version: "1.0.0",
    // API title
    title: "Pathway Worldwide API",
    // API description
    description:
      "Web Services CSE341 course. Team 13 course project: Pathway Worldwide API - a vague replica of the Pathway Worldwide Program ",
  },

  // Host URL where the API is hosted
  host: "cse341-team13.onrender.com",
  // host: "localhost:8080",

  // Array of supported protocols
  schemes: ["https", "http"],
};

// Output file where the generated Swagger JSON will be saved
const outputFile = "./models/swag.json";

// Array of endpoint files to scan for generating Swagger documentation
const endpointsFiles = ["./routers/index.js"];

// Generate Swagger JSON using swaggerAutogen
swaggerAutogen(outputFile, endpointsFiles, doc);
