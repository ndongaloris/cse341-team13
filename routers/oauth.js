const router = require("express").Router();
const passport = require("passport");

router.get(
  "/auth/github/loggedin",
  passport.authenticate("github", {
    failureRedirect: "/",
    session: false,
  }),
  // Successful authentication, redirect home.
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/api-docs");
  }
);

module.exports = router;
