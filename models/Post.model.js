const mongoose = require("mongoose");
const connection = require("../config/db.config");

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    featureImage: { type: String },
    createdAt: { type: Date, default: Date.now },
});
