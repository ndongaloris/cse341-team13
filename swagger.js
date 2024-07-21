// Require the swagger-autogen module
const swaggerAutogen = require("swagger-autogen")();

// Define the basic structure of the Swagger document
const doc = {
    // Swagger version
    swagger: "2.0",
    info: {
        // API version
        "version": "1.0.0",
        // API title
        "title": "School's API",
        // API description
        "description": "This is a school's API "
    },

    // Host URL where the API is hosted
    host: "cse341-team13.onrender.com",
    
    // Array of supported protocols
    schemes: ["https", "http"],
    };

// Output file where the generated Swagger JSON will be saved
const outputFile = "./models/swagger.json";

// Array of endpoint files to scan for generating Swagger documentation
const endpointsFiles = ["./routers/index.js"]; 

// Generate Swagger JSON using swaggerAutogen
swaggerAutogen(outputFile, endpointsFiles, doc);
