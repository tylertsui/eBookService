const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const eBook = db.eBookEntry;

let jwt = require("jsonwebtoken");


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


exports.addEbook = (req, res) => {
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
