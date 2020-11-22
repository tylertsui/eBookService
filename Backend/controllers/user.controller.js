const config = require("../config/auth.config.js");
const db = require("../models");
const { ObjectId } = require('mongodb')
const User = db.user;
const Role = db.role;
const eBook = db.eBookEntry;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");


exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.getAllBooks = (req, res) => {
    eBook.find({}).exec((err, results) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({ ebooks: results });
    })
};

exports.getBooksByAuthor = (req, res) => {
    eBook.find({ author: req.params.author }).exec((err, results) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (results.length == 0) {
            res.status(200).send({ ebooks: "Sorry, no matches found." });
            return;
        }
        res.status(200).send({ ebooks: results });
    })
};

exports.getBooksByGenre = (req, res) => {
    eBook.find({ genre: req.params.genre }).exec((err, results) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (results.length == 0) {
            res.status(200).send({ ebooks: "Sorry, no matches found." });
            return;
        }
        res.status(200).send({ ebooks: results });
    })
};

exports.getBooksByYear = (req, res) => {
    eBook.find({ publicationYear: req.params.year }).exec((err, results) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (results.length == 0) {
            res.status(200).send({ ebooks: "Sorry, no matches found." });
            return;
        }
        res.status(200).send({ ebooks: results });
    })
};

exports.getBooksByUploader = (req, res) => {
    eBook.find({ "uploader.username": req.params.uploader }).exec((err, results) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (results.length == 0) {
            res.status(200).send({ ebooks: "Sorry, no matches found." });
            return;
        }
        res.status(200).send({ ebooks: results });
    })
};

exports.deleteAnEbook = (req, res) => {
    eBook.findById(req.body._id).exec((err, book) => {
        User.findOneAndUpdate(
            { _id: book.uploader.id },
            { $pull: { uploadedBooks: book._id } },
            { useFindAndModify: false }
        ).exec(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        })
    })

    eBook.deleteOne({ _id: req.body._id }).exec((err) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({ message: "eBook deleted successfully" });
    })
};

exports.adminDeleteAccount = (req, res) => {
    User.findById(req.params.userID).exec((err, user) => {
        let userBooks = user.uploadedBooks;
        userBooks.forEach(bookID => {
            eBook.deleteOne({ _id: bookID }).exec((err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                console.log("Book successfully deleted");
            })
        })
    })
    User.deleteOne({ _id: req.params.userID }).exec((err) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({ message: "Account deleted successfully" });
    })
};

exports.editUser = (req, res) => {
    if (req.body.newUsername) {
        User.findByIdAndUpdate(
            { _id: req.body.userID },
            { $set: { username: req.body.newUsername } }
        ).exec(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            console.log("Username editted successfully");
        })
    }
    if (req.body.newEmail) {
        User.findByIdAndUpdate(
            { _id: req.body.userID },
            { $set: { email: req.body.newEmail } }
        ).exec(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            console.log("Email editted successfully");
        })
    }
    if (req.body.newPassword) {
        User.findByIdAndUpdate(
            { _id: req.body.userID },
            { $set: { password: bcrypt.hashSync(req.body.newPassword, 8) } }
        ).exec(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            console.log("Password editted successfully");
        })
    }
    res.status(200).send({message: "User profile editted successfully"});
}

exports.getAllUsers = (req, res) => {
    User.find({}).exec((err, results) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (results.length == 0) {
            res.status(200).send({ ebooks: "Sorry, no matches found." });
            return;
        }
        res.status(200).send({ users: results });
    })
};


exports.addEbook = (req, res) => {
    console.log("INSIDE THE FUNCTION")
    const entry = new eBook(
        {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publicationYear: req.body.publicationYear,
            content: req.body.content
        });
    entry.save((err, entry) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        User.findOneAndUpdate(
            { username: req.body.uploader },
            { $push: { uploadedBooks: entry._id } },
            { useFindAndModify: false })
            .exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                entry.uploader.id = user._id;
                entry.uploader.username = user.username;
                entry.uploader.email = user.email;
                entry.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(200).send({ message: `eBook added to DB successfully`, info: entry });
                })

            })
    })
}
