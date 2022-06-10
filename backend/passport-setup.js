const passport = require('passport');

// const helpers = require('./utils/helpers');
// const constants = require('./utils/constants');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const User = require('./models/User');

// Serialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize User
passport.deserializeUser((id, done) => {
  done(null, id);
});

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}${process.env.GOOGLE_CALLBACK_URL}`,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // If user/account exist
      try {
        const oldUser = await User.findOne({ uid: profile.id });

        if (oldUser) {
          return done(null, oldUser);
        }
      } catch (err) {
        console.log(err);
      }

      // If user with the email exist
      try {
        const sameEmail = await User.findOne({
          email: profile.emails[0].value,
        });

        if (sameEmail) {
          return done(null, sameEmail);
        }
      } catch (err) {
        console.log(err);
      }

      // if user or email doesn't exist
      try {
        const newUser = await new User({
          provider: 'google',
          uid: profile.id,
          email: profile.emails.length ? profile.emails[0].value : 'none',
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          role: 'Guest',
        }).save();
        done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

// Configure Github Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}${process.env.GITHUB_CALLBACK_URL}`,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // If user/account exist
      try {
        const oldUser = await User.findOne({ uid: profile.id });

        if (oldUser) {
          return done(null, oldUser);
        }
      } catch (err) {
        console.log(err);
      }

      // If user with the email exist
      try {
        const sameEmail = await User.findOne({
          email: profile.emails[0].value,
        });

        if (sameEmail) {
          return done(null, sameEmail);
        }
      } catch (err) {
        console.log(err);
      }

      // if user or email doesn't exist
      try {
        const newUser = await new User({
          provider: 'github',
          uid: profile.id,
          email: profile.emails.length ? profile.emails[0].value : 'none',
          name: profile.displayName,
          role: 'Guest',
        }).save();
        done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

// Configure Microsoft Strategy
passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}${process.env.MICROSOFT_CALLBACK_URL}`,
      proxy: true,
      scope: ['user.read'],
    },
    async (accessToken, refreshToken, profile, done) => {
      // If user/account exist
      try {
        const oldUser = await User.findOne({ uid: profile.id });

        if (oldUser) {
          return done(null, oldUser);
        }
      } catch (err) {
        console.log(err);
      }

      // If user with the email exist
      try {
        const sameEmail = await User.findOne({
          email: profile.emails[0].value,
        });

        if (sameEmail) {
          return done(null, sameEmail);
        }
      } catch (err) {
        console.log(err);
      }

      // if user or email doesn't exist
      try {
        const newUser = await new User({
          provider: 'microsoft',
          uid: profile.id,
          email: profile.emails.length ? profile.emails[0].value : 'none',
          name: profile.displayName,
          role: 'Guest',
        }).save();
        done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    }
  )
);
