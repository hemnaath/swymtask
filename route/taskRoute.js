const express = require('express');
const taskController = require('../controller/taskConotroller');

const router = express.Router();

router.post('/create-task', taskController.createTask);
router.get('/get-task', taskController.getTask);
router.patch('/update-task/:id', taskController.updateTask); 
router.delete('/delete-task/:id', taskController.deleteTask);

module.exports = router;