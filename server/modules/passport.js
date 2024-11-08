const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userSchema = require('./userSchema'); // Database model

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://codeit-api.vercel.app/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log(profile);  // Logs the profile data for debugging

        // Check if the user exists in your database
        let user = await userSchema.findOne({ googleId: profile.id });
        
        if (user) {
          // User found, return the user
          return done(null, user);
        } else {
          // User not found, create new user
          const newUser = await userSchema.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          return done(null, newUser);
        }
      } catch (error) {
        console.error("Error in Google Strategy:", error);
        return done(error, null); // Pass error to Passport
      }
    }
  )
);

// Serialize the user ID to save in session
passport.serializeUser((user, done) => {
  done(null, user.googleId); // Storing only user ID for efficiency
});

// Deserialize the user ID to retrieve full user data from DB
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userSchema.findOne({ googleId: id });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
