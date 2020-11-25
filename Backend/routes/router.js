const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/users.middleware.js');
const authController = require("../controllers/auth.controller.js");
const usersController = require("../controllers/users.controller.js");

router.get("/ebooks", userMiddleware.isLoggedIn, usersController.getAllBooks);
router.get("/ebooks/title/:title", userMiddleware.isLoggedIn, usersController.getBooksByTitle);
router.get("/ebooks/author/:author", userMiddleware.isLoggedIn, usersController.getBooksByAuthor);
router.get("/ebooks/genre/:genre", userMiddleware.isLoggedIn, usersController.getBooksByGenre);
router.get("/ebooks/year/:year", userMiddleware.isLoggedIn, usersController.getBooksByYear);
router.get("/ebooks/uploader/:uploader", userMiddleware.isLoggedIn, usersController.getBooksByUser);
router.get("/ebooks/youruploads", userMiddleware.isLoggedIn, usersController.getBooksYouUploaded);

router.post('/signup', userMiddleware.validateRegister, authController.signup);
router.post('/login', authController.login);
router.post('/add/ebook', userMiddleware.isLoggedIn, usersController.addEbook);

router.put("/edit/user", userMiddleware.isLoggedIn, usersController.editUser);
router.put("/edit/ebook", userMiddleware.isLoggedIn, usersController.editEbook);

router.delete("/delete/ebook", userMiddleware.isLoggedIn, usersController.deleteEbook);
router.delete("/delete/user", userMiddleware.isLoggedIn, usersController.deleteUser);

module.exports = router;