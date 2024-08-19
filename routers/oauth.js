const router = require("express").Router();
const passport = require("passport");

router.get(
  "/login",
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

router.get('/auth/google',
  passport.authenticate('google', { 
      scope: [ 'email', 'profile' ] , 
      failureRedirect: '/' , 
      session: false
    })
);

router.get('/auth/google/loggedin', (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/api-docs');
});

module.exports = router;