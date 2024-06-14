const router = require("express").Router();
const passport = require("passport");

// Route to start OAuth with Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// Callback route for Google to redirect to
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect("/dashboard");
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
