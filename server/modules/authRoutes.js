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
  passport.authenticate('google', { failureRedirect: '/login/failed' }),
  async (req, res, next) => {
    const profile = req.user;  // Profile data will now be available here
    try {
      if (!profile) {
        return res.status(500).json({ error: true, message: "Profile data not available" });
      }

      // Check if the user exists in the database
      let user = await userSchema.findOne({ googleId: profile.id });

      if (user) {
        req.session.user = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        };
        return res.redirect(`${process.env.CLIENT_URL}/home`);
      } else {
        let newUser = new userSchema({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        });

        await newUser.save();

        req.session.user = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        };

        return res.redirect(`${process.env.CLIENT_URL}/home`);
      }
    } catch (err) {
      console.error(err);  // Detailed error logging
      return res.status(500).json({ error: true, message: "Internal Server Error" });
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
