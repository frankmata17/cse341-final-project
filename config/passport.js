const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/userModel');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // First try to find the user based on their GitHub ID.
      let user = await User.findOne({ githubId: profile.id });
      
      // If not found, try finding the user by email (using a fallback if necessary).
      if (!user) {
        const email = (profile.emails && profile.emails[0] && profile.emails[0].value) || 'noemail@github.com';
        user = await User.findOne({ email: email });
        
        // If a user was found by email, update their githubId.
        if (user) {
          user.githubId = profile.id;
          await user.save();
        } else {
          // If no user exists, create a new one.
          user = await User.create({
            username: profile.username,
            email: email,
            githubId: profile.id,
            role: 'user',
            passwordHash: 'oauth' // Dummy value indicating this user is created via OAuth.
          });
        }
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
