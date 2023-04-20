const mongoose = require("mongoose");
require("dotenv").config();

// *CONNECT TO MONGODB DATABASE*
const connnectionString = process.env.MONGO_DB_CONNECTION;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connection = mongoose.createConnection(connnectionString, options);

module.exports = connection;
