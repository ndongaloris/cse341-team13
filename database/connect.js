const mongoose = require("mongoose");
require("dotenv").config();

const databaseURI = process.env.DB_URL;
mongoose.connect(databaseURI).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.error('Cannot connect to the database!', err);
    process.exit();
});