const router = require("express").Router();
const passport = require("passport");
const { genPassword } = require("../lib/passportUtils");
const User = require("../models/User.model");

router.post("/signup", async (req, res, next) => {
    const { password, username, email } = req.body;

    const { salt, hash } = genPassword(password);

    try {
        const newUser = new User({
            username: username,
            hash: hash,
            salt: salt,
            email: email,
            role: "user",
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

router.post("/signin", passport.authenticate("local"), (req, res) => {
    res.send("Hello from login");
});

router.post("/forgot_password", (req, res) => {
    res.send("Hello from forgot password");
});
module.exports = router;
