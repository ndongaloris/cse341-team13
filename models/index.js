require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

// Importing models
const degreeModel = require("./degree");
const institutionModel = require("./institution");
const userModel = require("./user");

// Database connection URI
db.Uri = process.env.DB_URL;
db.mongoose = mongoose;

// Assigning models to db object
db.degree = degreeModel(mongoose);
db.institution = institutionModel(mongoose);
db.user = userModel(mongoose);

module.exports = db;
