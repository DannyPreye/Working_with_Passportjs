const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./db.config");
const User = require("../models/User.model");
const { validPassword, genPassword } = require("../lib/passportUtils");

const customFieds = { usernameField: "username", passwordField: "password" };

const verifyCallback = (username, password, done) => {
    // Find the user in the db
    User.findOne({ username: username })
        .then((user) => {
            if (!user)
                return done(null, false, { message: "User is not registered" });
            // Check if password is valid
            const isValid = validPassword(password, user.hash, user.salt);

            if (isValid) {
                // Return the user details if the password is valid
                return done(null, user);
            } else {
                // The user password is not valid
                return done(null, false);
            }
        })
        .catch((err) => {
            done(err);
        });
};

const strategy = new LocalStrategy(customFieds, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    // Store the user Id into the session
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    // Grab the userId stored in the session from the db
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch((er) => done(err));
});
