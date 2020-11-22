const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //eBook related
    app.get("/api/books", [authJwt.verifyToken], controller.getAllBooks);
    app.get("/api/books/author/:author", [authJwt.verifyToken], controller.getBooksByAuthor);
    app.get("/api/books/genre/:genre", [authJwt.verifyToken], controller.getBooksByGenre);
    app.get("/api/books/year/:year", [authJwt.verifyToken], controller.getBooksByYear);
    app.get("/api/books/uploader/:uploader", [authJwt.verifyToken], controller.getBooksByUploader);

    app.post("/api/eBookAdd", [authJwt.verifyToken], controller.addEbook)

    app.delete("/api/delete/ebook", [authJwt.verifyToken], controller.deleteAnEbook)

    //User related
    app.get("/api/users", [authJwt.verifyToken], controller.getAllUsers);
    app.post("/api/editUser", [authJwt.verifyToken], controller.editUser);

    //Admin API calls
    app.delete("/api/admin/delete/account/:userID", [authJwt.verifyToken, authJwt.isAdmin], controller.adminDeleteAccount)



    app.get(
        "/api/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );


};