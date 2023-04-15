const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String },
    role: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
