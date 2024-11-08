const router = require("express").Router();
const passport = require("passport");
const userSchema = require('./userSchema');

// Login success route
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

// Login failure route
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

// Google login route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  async (req, res) => {
    const profile = req.user; // Profile data available after authentication

    try {
      // Check if the user exists in the database
      let user = await userSchema.findOne({ googleId: profile.id });

      if (!user) {
        // User doesn't exist, create a new user
        user = await userSchema.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        });
      }

      // Store user data in session
      req.session.user = {
        googleId: user.googleId,
        name: user.name,
        email: user.email,
        image: user.image,
      };

      return res.redirect(`${process.env.CLIENT_URL}/home`);
    } catch (err) {
      console.error("Error during authentication:", err);
      return res.redirect("/login/failed");
    }
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) console.error("Logout error:", err);
  });
  req.session.destroy(() => {
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = router;
