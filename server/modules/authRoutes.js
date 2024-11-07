const router = require("express").Router();
const passport = require("passport");
const userSchema = require('./userSchema');

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",  // Use relative callback route
  passport.authenticate('google', { failureRedirect: '/login/failed' }),
  async function (req, res, next) {
    const profile = req.user;  // Profile data will now be available here

    try {
      // Check if the user exists in the database
      let user = await userSchema.findOne({ googleId: profile.id });

      if (user) {
        // User exists, store in session
        req.session.user = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        };
        return res.redirect(`${process.env.CLIENT_URL}/home`);
      } else {
        // User doesn't exist, create a new user
        let newUser = new userSchema({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        });

        await newUser.save();

        // Store new user in session
        req.session.user = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        };

        return res.redirect(`${process.env.CLIENT_URL}/home`);
      }
    } catch (err) {
      // Error handling, redirect to failure page
      console.error(err);
      return res.redirect("/login/failed");
    }
  }
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;