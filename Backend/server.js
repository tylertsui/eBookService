const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

const db = require("./models");
const dbConfig = require("./config/db.config");
const Role = db.role;

db.mongoose
    .connect(dbConfig.PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

const initial = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

app.get("/", (req, res) => {
    res.json({ message: "Welcome to eBookServices" })
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
