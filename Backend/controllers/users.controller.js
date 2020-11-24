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
    db.query(`SELECT * FROM ebooks 
    WHERE title = LOWER(${db.escape(title)})
    AND author = LOWER(${db.escape(author)})`, (err, results) => {
        console.log("RESULTS: " + JSON.stringify(results))
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

exports.getAllBooks = (req, res, next) => {
    db.query(`SELECT * FROM ebooks`, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                msg: `eBook query failed: ${err}`
            });
        }
        return res.status(200).send({
            msg: results,
        });
    })
}

exports.getBooksByTitle = (req, res, next) => {
    let title = req.params.title;
    db.query(`SELECT * FROM ebooks WHERE title=${db.escape(title)}`, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                msg: `eBook query failed: ${err}`
            });
        }
        return res.status(200).send({
            msg: results,
        });
    })
}

exports.getBooksByAuthor = (req, res, next) => {
    let author = req.params.author;
    db.query(`SELECT * FROM ebooks WHERE author=${db.escape(author)}`, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                msg: `eBook query failed: ${err}`
            });
        }
        return res.status(200).send({
            msg: results,
        });
    })
}

exports.getBooksByGenre = (req, res, next) => {
    let genre = req.params.genre;
    db.query(`SELECT * FROM ebooks WHERE genre=${db.escape(genre)}`, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                msg: `eBook query failed: ${err}`
            });
        }
        return res.status(200).send({
            msg: results,
        });
    })
}

exports.getBooksByYear = (req, res, next) => {
    let year = req.params.year;
    db.query(`SELECT * FROM ebooks WHERE year=${db.escape(year)}`, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                msg: `eBook query failed: ${err}`
            });
        }
        return res.status(200).send({
            msg: results,
        });
    })
}

exports.getBooksByUploader = (req, res, next) => {
    let userID = req.userData.userID;
    db.query(`SELECT * FROM ebooks WHERE userID=${db.escape(userID)}`, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                msg: `eBook query failed: ${err}`
            });
        }
        return res.status(200).send({
            msg: results,
        });
    })
}

exports.editUser = (req, res, next) => {
    let userID = req.userData.userID;
    let oldPassword = req.body.oldPassword;
    let newUsername = req.body.newUsername;
    let newEmail = req.body.newEmail;
    let newPassword = req.body.newPassword;

    db.query(`SELECT * FROM users WHERE id=${userID}`, (err, result) => {

        if (!result.length) {
            return res.status(400).send({
                msg: `No matching user`
            });
        }

        bcrypt.compare(
            oldPassword,
            result[0]['password'],
            (bErr, bResult) => {

                // wrong password
                if (bErr || !bResult) {
                    console.log(bErr);
                    return res.status(401).send({
                        msg: 'Please enter the correct password to make changes'
                    });
                }

                if (bResult) {
                    if (!newUsername && !newPassword && !newEmail) {
                        return res.status(400).send({
                            msg: `You must enter a new value for at least one field`
                        });
                    }

                    if (newUsername) {
                        db.query(`UPDATE users SET username=${db.escape(newUsername)} WHERE id=${userID}`, (err, results) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send({
                                    msg: `Username change failed: ${err}`
                                });
                            }
                            console.log("Username changed successfuly");
                        })
                    }

                    if (newEmail) {
                        db.query(`UPDATE users SET email=${db.escape(newEmail)} WHERE id=${userID}`, (err, results) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send({
                                    msg: `Email change failed: ${err}`
                                });
                            }
                            console.log("Email changed successfuly");
                        })
                    }

                    if (newPassword) {
                        bcrypt.hash(newPassword, 10, (err, hash) => {
                            db.query(`UPDATE users SET password='${hash}' WHERE id=${userID}`, (err, results) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send({
                                    msg: `Password change failed: ${err}`
                                });
                            }
                            console.log("Password changed successfuly");
                        })
                        })
                        
                    }

                    return res.status(200).send({
                        msg: `User editted successfully`
                    });
                }
            })
        }
    )
}

exports.editEbook = (req, res, next) => {
    let userID = req.userData.userID;
    let bookID = req.body.bookID;
    let password = req.body.password;
    let newTitle = req.body.newTitle;
    let newAuthor = req.body.newAuthor;
    let newGenre = req.body.newGenre;
    let newYear = req.body.newYear;

    db.query(`SELECT * FROM users WHERE id=${userID}`, (err, result) => {

        if (!result.length) {
            return res.status(400).send({
                msg: `No matching user`
            });
        }

        bcrypt.compare(
            password,
            result[0]['password'],
            (bErr, bResult) => {

                // wrong password
                if (bErr || !bResult) {
                    console.log(bErr);
                    return res.status(401).send({
                        msg: 'Please enter the correct password to make changes'
                    });
                }

                if (bResult) {
                    if (!newTitle && !newAuthor && !newGenre && !newYear) {
                        return res.status(400).send({
                            msg: `You must enter a new value for at least one field`
                        });
                    }

                    if (newTitle) {
                        db.query(`UPDATE ebooks SET title=${db.escape(newTitle)} WHERE id=${bookID}`, (err, results) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send({
                                    msg: `Title change failed: ${err}`
                                });
                            }
                            console.log("Title changed successfuly");
                        })
                    }

                    if (newAuthor) {
                        db.query(`UPDATE ebooks SET author=${db.escape(newAuthor)} WHERE id=${bookID}`, (err, results) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send({
                                    msg: `Author change failed: ${err}`
                                });
                            }
                            console.log("Author changed successfuly");
                        })
                    }

                    if (newGenre) {
                        db.query(`UPDATE ebooks SET genre=${db.escape(newGenre)} WHERE id=${bookID}`, (err, results) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send({
                                    msg: `Genre change failed: ${err}`
                                });
                            }
                            console.log("Genre changed successfuly");
                        })
                    }

                    if (newYear) {
                        db.query(`UPDATE ebooks SET year=${db.escape(newYear)} WHERE id=${bookID}`, (err, results) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send({
                                    msg: `Publication year change failed: ${err}`
                                });
                            }
                            console.log("Publication year changed successfuly");
                        })
                    }

                    return res.status(200).send({
                        msg: `eBook information editted successfully`
                    });
                }
            })
        }
    )
}

exports.deleteEbook = (req, res, next) => {
    let title = req.body.title;
    let author = req.body.author;
    let userID = req.userData.userID;
    db.query(
        `SELECT * FROM ebooks WHERE title=${db.escape(title)}
        AND userID=${db.escape(userID)}
        AND author=${db.escape(author)}`, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                msg: `eBook query failed: ${err}`
            });
        }
        if (!result.length) {
            return res.status(400).send({
                msg: `No matching eBook uploaded by this user`
            });
        } else {
            db.query(`DELETE FROM ebooks WHERE title=${db.escape(title)}
                AND userID=${db.escape(userID)}
                AND author=${db.escape(author)}`, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send({
                        msg: `eBook deletion failed: ${err}`
                    });
                }
                return res.status(200).send({
                    msg: `eBook: ${title} deleted successfully`
                })
            })
        }
    })
}

exports.deleteUser = (req, res, next) => {
    let userID = req.userData.userID
    db.query(`DELETE FROM users WHERE id=${db.escape(userID)}`, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                msg: `User deletion failed: ${err}`
            });
        }
        return res.status(200).send({
            msg: `USER: ${req.userData.username} deleted successfully`,
        });
    })
}