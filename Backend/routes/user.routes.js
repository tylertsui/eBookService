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

  app.get("/api/books", [authJwt.verifyToken], controller.getAllBooks);
  app.get("/api/books/:author", [authJwt.verifyToken], controller.getBooksByAuthor);

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post("/api/eBookAdd", [authJwt.verifyToken], controller.addEbook )
};