const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/create-user', userController.createUser);
router.get('/get-user/:id',userController.getUserById);
router.patch('/update-user/:id',userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;