const taskRouter = require('express').Router()
const taskController = require('../controllers/task.controller')

// Simple CRUD for the Tasks

taskRouter.post('/', taskController.createTask)

taskRouter.get('/', taskController.showTasks)

taskRouter.patch('/:id',taskController.updateTask)

taskRouter.delete('/:id', taskController.removeTask)

module.exports = taskRouter
