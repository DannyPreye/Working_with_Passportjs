const router = require("express").Router();
const passport = require("passport");
const { genPassword } = require("../lib/passportUtils");
const User = require("../models/User.model");

router.post("/signup", async (req, res, next) => {
    const { password, username, email, role } = req.body;

    const { salt, hash } = genPassword(password);

    try {
        const newUser = new User({
            username: username,
            hash: hash,
            salt: salt,
            email: email,
            role: role || "user",
        });

        const user = await newUser.save();
        res.status(200).json({
            error: false,
            data: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: true,
            message: "User could not be registered successfully",
        });
    }

    // Store user data in db
});

router.post(
    "/signin",
    passport.authenticate("local", { failureMessage: true }),
    async (req, res) => {
        try {
            // Get the userId from the session
            const userId = req.session.passport.user;
            // Find the user in the database
            const user = req.user;
            // Send the user data to the client
            res.status(200).json({
                error: false,
                data: {
                    username: user.username,
                    email: user.email,
                },
            });

            console.log("from signin user", req.user);
        } catch (err) {
            res.status(500).json({ error: true, message: "User not found" });
        }
    }
);

router.post("/forgot_password", (req, res) => {
    res.send("Hello from forgot password");
});

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            res.status(500).json({ error: true, message: "Error logging out" });
        } else {
            res.status(200).json({
                error: false,
                message: "Logged out successfully",
            });
        }
    });
});
module.exports = router;
