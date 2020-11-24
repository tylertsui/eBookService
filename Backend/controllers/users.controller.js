const db = require('../config/db.config');
const uuid = require('uuid');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.addEbook = (req, res, next) => {
    const { title, author, genre, year, content } = req.body;
    const { username, userID } = req.userData;
    console.log(req.body)
    console.log(req.userData)
    if (!title || !author || !genre || !year || !content) {
        return res.status(400).send({
            msg: 'Please enter correct information for all required fields!'
        });
    }
    db.query(`SELECT * FROM ebooks WHERE LOWER(title) = LOWER(${db.escape(title)})`, (err, results) => {
        console.log(results)
        if (results.length) {
            return res.status(409).send({
                msg: 'Someone already uploaded the same ebook!'
            });
        } else {
            db.query(`INSERT INTO ebooks (id, userID, title, author, genre, year, content) VALUES
            ('${uuid.v4()}',
            ${db.escape(userID)},
            ${db.escape(title)},
            ${db.escape(author)},
            ${db.escape(genre)},
            ${db.escape(year)},
            ${db.escape(content)})`, (err, results) => {
                console.log(results)
                if (err) {
                    console.log(err);
                    return res.status(400).send({
                        msg: `eBook upload failed: ${err}`
                    });
                }
                return res.status(200).send({
                    msg: `eBook uploaded successfully!`,
                });
            })
        }
    })
}