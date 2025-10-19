const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');

// Routes
router.post('/user', userController.getUserData);
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/getall', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
