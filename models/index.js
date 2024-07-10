require("dotenv").config();
const mongoose = require("mongoose");
const degree = require("./degree");
const institution = require("./institution");

mongoose.Promise = global.Promise;
const db = {};

db.Uri = process.env.DB_URL; 
db.mongoose = mongoose;
db.degree = degree(mongoose);
db.institution = institution(mongoose);

module.exports = db;