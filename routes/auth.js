const router = require("express").Router();
const passport = require("passport");

router.post("/signup", (req, res) => {
    res.send("Hello from signup");
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.send("Hello from login");
});

router.post("/forgot_password", (req, res) => {
    res.send("Hello from forgot password");
});
module.exports = router;
