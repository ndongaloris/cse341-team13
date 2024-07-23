require("dotenv").config();
const mongoose = require("mongoose");
const db = require("./models"); // Adjust the path if necessary

// Import the creation functions
const createInstitutions = require("./createInstitutions");
const createDegrees = require("./createDegrees");
const createCourses = require("./createCourses");
const createCertificates = require("./createCertificates");

async function populateDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(db.Uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");

    // Create institutions
    await createInstitutions();
    console.log("Institutions created!");

    // Create courses
    await createCourses();
    console.log("Courses created!");

    // Create degrees
    await createDegrees();
    console.log("Degrees created!");

    // Create certificates
    await createCertificates();
    console.log("Certificates created!");

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error populating the database:", error);
    mongoose.connection.close();
  }
}

populateDatabase();
