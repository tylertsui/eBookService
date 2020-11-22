const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    uploadedBooks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "eBookEntry"
        }
      ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;