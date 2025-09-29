const mongoose = require('mongoose')
const taskModel = require('../models/task')

// Create Task
async function createTask(req, res){
    try {
        const task = await taskModel.create(req.body)
        res.status(201).send({message: 'Task created successfully', data: task})
    } catch (err) {
        console.log(err)
        res.status(500).send({error: err.message})
    }
}

// List Tasks
async function showTasks(req, res){
    try {
        const tasks = await taskModel.find()
        res.status(200).send({message: 'All Task', data: tasks})
    } catch (err) {
        console.log(err)
        res.status(500).send({error: err.message})
    }
}

// Update Task
async function updateTask(req, res){
    try {
        const id = req.params.id

        // Check if the id is valid
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({error: 'Invalid task ID'})

        const task = await taskModel.findByIdAndUpdate(id, req.body, {new: true})

        if(!task) return res.status(404).send({message: 'Task not found'})

        res.status(200).send({message: 'Task updated successfully', data: task})
    } catch (err) {
        console.log(err)
        res.status(500).send({error: err.message})
    }
}

// Delete Task
async function removeTask(req, res){
    try {
        const id = req.params.id

        // Check if the id is valid
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({error: 'Invalid task ID'})

        const task = await taskModel.findByIdAndDelete(id, {new: true})

        if(!task) return res.status(404).send({message: 'Task not found'})
            
        res.status(200).send({message: 'Task deleted successfully'})
    } catch (err) {
        console.log(err)
        res.status(500).send({error: err.message})
    }
}

module.exports = {
    createTask,
    showTasks,
    updateTask,
    removeTask
}