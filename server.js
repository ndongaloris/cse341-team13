require("dotenv").config();
const session = require("express-session");
const express = require("express");
const app = express();
const router = require("./routers/index")
const mongodbConnect = require("./database/connect")

app.use("/", router);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
    console.log(`Server listening on ${HOST}: ${PORT}`);
})