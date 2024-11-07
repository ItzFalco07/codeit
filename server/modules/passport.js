const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userSchema = require('./userSchema');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      // Here you can handle user login, profile saving, etc.
      console.log(profile);  // Helps you inspect the profile object
      return done(null, profile); // Passing profile data to done()
    }
  )
);


passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});