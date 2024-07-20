require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

// Importing models
const certificateModel = require("./certificate");
const courseModel = require("./course");
const degreeModel = require("./degree");
const institutionModel = require("./institution");

// Database connection URI
db.Uri = process.env.DB_URL;
db.mongoose = mongoose;

// Assigning models to db object
db.certificate = certificateModel(mongoose);
db.course = courseModel(mongoose);
db.degree = degreeModel(mongoose);
db.institution = institutionModel(mongoose);

module.exports = db;
