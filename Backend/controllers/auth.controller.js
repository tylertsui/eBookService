const db = require('../config/db.config');
const uuid = require('uuid');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
            req.body.username
        )})`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'This username is already in use!'
                });
            } else {
                db.query(
                    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
                        req.body.email
                    )})`, (err, result) => {
                        if (result.length) {
                            return res.status(409).send({
                                msg: 'This email is already in use!'
                            });
                        } else {
                            // username is available
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                if (err) {
                                    return res.status(500).send({
                                        msg: err
                                    });
                                } else {
                                    // has hashed pw => add to database
                                    db.query(
                                        `INSERT INTO users (id, username, password, email, registered) VALUES 
                                        ('${uuid.v4()}', 
                                        ${db.escape(req.body.username)}, 
                                        ${db.escape(hash)},
                                        ${db.escape(req.body.email)},
                                        now())`,
                                        (err, result) => {
                                            console.log(result)
                                            if (err) {
                                                console.log(err);
                                                return res.status(400).send({
                                                    msg: err
                                                });
                                            }
                                            return res.status(201).send({
                                                msg: 'Registered!'
                                            });
                                        }
                                    );
                                }
                            });
                        }
                    }
                )
            }
        }
    );
}

exports.login = (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                console.log(err);
                return res.status(400).send({
                    msg: "User does not exist"
                });
            }

            if (!result.length) {
                return res.status(401).send({
                    msg: 'Username or password is incorrect!'
                });
            }

            // check password
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    // wrong password
                    if (bErr) {
                        console.log(bErr);
                        return res.status(401).send({
                            msg: 'Username or password is incorrect!'
                        });
                    }

                    if (bResult) {
                        const token = jwt.sign({
                            username: result[0].username,
                            userID: result[0].id
                        },
                            'SECRETKEY', {
                            expiresIn: '7d'
                        }
                        );

                        db.query(
                            `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                        );
                        return res.status(200).send({
                            msg: 'Logged in!',
                            token,
                            user: result[0]
                        });
                    }
                    return res.status(401).send({
                        msg: 'Username or password is incorrect!'
                    });
                }
            );
        }
    );
};