const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cryto = require("crypto");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cors = require("cors");

require("dotenv").config();

const MongoStore = require("connect-mongo");

const app = express();

// *CONNECT TO MONGODB DATABASE*
// This is the connection string for the MongoDB database
const connnectionString = process.env.MONGO_DB_CONNECTION;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const connection = mongoose.createConnection(connnectionString, options);

/*

*------------------------Middlewares--------------------------*
*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
        store: MongoStore.create({
            mongoUrl: connnectionString,
            collection: "sessions",
        }),
    })
);

// *--------------- Passport --------------------*
// this is make app js aware the password configuration
require("./config/passport.config");

app.use(passport.initialize());
app.use(passport.session());

// *----------------------------------- *Routes----------------------------------*
app.use("/auth", authRoute);
app.get("/", (req, res) => {
    if (req.session.viewCount) {
        req.session.viewCount += 1;
    } else {
        req.session.viewCount = 1;
    }

    res.send(`You have visited this page ${req.session.viewCount} times`);
    console.log(req.session);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
