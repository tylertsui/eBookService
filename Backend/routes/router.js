const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const userMiddleware = require('../middleware/users.middleware.js');
const authController = require("../controllers/auth.controller.js");
const usersController = require("../controllers/users.controller.js");


router.post('/signup', userMiddleware.validateRegister, authController.signup);

router.post('/login', authController.login);

router.post('/add/ebook', userMiddleware.isLoggedIn, usersController.addEbook);

module.exports = router;