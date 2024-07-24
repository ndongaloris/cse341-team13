require("dotenv").config(); // Loads environment variables from a .env file into process.env
require("./database/connect"); // Connects to MongoDB
const passport = require("passport");
const gitHubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routers/index"); // Imports the main router containing all routes
const bodyParser = require("body-parser"); // Import body-parser (if not using built-in)
require("dotenv").config();
// Middleware setup
app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.json()) // Use body-parser middleware (if not using built-in)
  .use("/", router);
// Mounts all routes defined in the router under the root (/) endpoint

passport.use(
  new gitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRETS,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (id, done) {
  done(null, user);
});

// Environment variables setup
const PORT = process.env.PORT || 8080; // Sets the port for the server, defaults to 8080 if not specified in .env
const HOST = process.env.HOST || "localhost"; // Sets the host for the server, defaults to localhost if not specified in .env

//* Start server
// app.listen(PORT, () => {
//   console.log(`Server listening on ${HOST}:${PORT}`);
// });

// Start server for unit testing
const server = app.listen(PORT, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});

//* Export app for testing
module.exports = { app, server };
