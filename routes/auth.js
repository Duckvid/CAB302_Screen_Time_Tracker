var express = require("express");
var router = express.Router();
var passport = require("passport");

router.get('/google', async (req, res, next) =>
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    // Pass the redirect Url through state
    state: req.query.redirectUrl,
  })(req, res, next)
);

router.get("/linkedin", async (req, res, next) =>
  passport.authenticate('linkedin', {
    // Pass the redirect Url through state
    state: req.query.redirectUrl,
  })(req, res, next)
);

router.get("/facebook", async (req, res, next) =>
  passport.authenticate('facebook', {

    state:req.query.redirectUrl,
  })(req, res, next)
  );

if (process.env.NODE_ENV === "production") {
  router.get(
    "/google/callback",
    async (req, res, next) =>
    passport.authenticate("google", {
      successRedirect: req.query.state || "/profile",
      failureRedirect: "/login",
    })(req, res, next)
  );
  router.get(
    "/linkedin/callback",
    async (req, res, next) =>
    passport.authenticate("linkedin", {
      successRedirect: req.query.state || "/profile",
      failureRedirect: "/login",
    })(req, res, next)
  );
  router.get(
    "/facebook/callback",
    async (req, res, next) =>
    passport.authenticate("facebook",{
      successRedirect: req.query.state || "/profile",
      failureRedirect: "/login",
    })(req, res, next)
  );
} else {
  router.get(
    "/google/callback",
    async (req, res, next) =>
    passport.authenticate('google', {
      successRedirect: `http://localhost:3000${req.query.state || '/profile'}`,
      failureRedirect: 'http://localhost:3000/login',
    })(req, res, next)
  );
  router.get(
    "/linkedin/callback",
    async (req, res, next) =>
    passport.authenticate("linkedin", {
      successRedirect: `http://localhost:3000${req.query.state || '/profile'}`,
      failureRedirect: "http://localhost:3000/login",
    })(req, res, next)
  );
  router.get(
    "/facebook/callback",
    async (req, res, next) =>
    passport.authenticate("facebook", {
      successRedirect: `http://localhost:3000${req.query.state || '/profile'}`,
      failureRedirect: 'http://localhost:3000/login',
    })(req, res, next)
  );
}

router.get("/logout", function (req, res) {
  if (req.user) {
    req.logout((err) => {
      console.log(err);
    });
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
});

router.get("/verify", function (req, res) {
  if (req.user) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
});

module.exports = router;
