const mongoose = require("mongoose");

const eBookEntry = mongoose.model(
    "eBookEntry",
    new mongoose.Schema({
        title: String,
        author: String,
        genre: String,
        publicationYear: Number,
        content: String,
        uploader: 
        {
            id: String,
            username: String,
            email: String
        }
        
    })
);

module.exports = eBookEntry;