// models/Posts.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // Add this line to store the image URL or path
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
