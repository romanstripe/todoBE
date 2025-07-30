const express = require('express');
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');
const router = express.Router();

router.post('/', userController.createUser);
router.post('/login', userController.loginWithEmail);
router.get('/me', authController.authenticate, userController.getUser);
//1st authController.authenticate -> 2nd userController.getUser
// next() function acts -> role

module.exports = router;
