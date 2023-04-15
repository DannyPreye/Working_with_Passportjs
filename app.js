const mongoose = require("mongoose");
const express = require("express");
const MongoStore = require("connect-mongo")(session);

const app = express();
// *CONNECT TO MONGODB DATABASE*
// This is the connection string for the MongoDB database
const connnectionString = process.env.MONGO_DB_CONNECTION;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const connection = mongoose.createConnection(connnectionString, options);

// *Middlewares*
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// *SESSIONS*
const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: "sessions",
});
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
    })
);

app.get("/", (req, res) => {
    res.send("Hello World!");
});
