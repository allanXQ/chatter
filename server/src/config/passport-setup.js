const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Admin = require("../models/admin"); // Assuming Admin schema includes OAuth fields

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let admin = await Admin.findOne({ googleId: profile.id });
        if (!admin) {
          admin = await new Admin({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture,
          }).save();
        }
        done(null, admin);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((admin, done) => {
  done(null, admin.id);
});

passport.deserializeUser((id, done) => {
  Admin.findById(id, (err, admin) => {
    done(err, admin);
  });
});
