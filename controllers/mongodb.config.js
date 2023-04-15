const mongoose = require("mongoose");
require("dotenv").config();

// This is the connection string for the MongoDB database
const connnectionString = process.env.MONGO_DB_CONNECTION;
