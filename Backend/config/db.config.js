const mysql = require('mysql');

const connection = mysql.createPool({
    host: "us-cdbr-east-02.cleardb.com",
    user: "b308b59060adc5",
    password: "406c3f5c",
    database: "heroku_305d702e594dd56",
    connectionLimit: 15,
    queueLimit: 30,
    acquireTimeout: 10000
});

// connection.connect();

module.exports = connection;
