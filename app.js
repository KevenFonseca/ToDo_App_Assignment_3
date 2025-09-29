const express = require('express')
const connectDB = require('./config/configdb')
const taskRoute = require('./routes/task.router')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

// Connect to MongoDB
connectDB()

// Midleware
app.use(express.json())
app.use(express.static('public'))

// Routes
app.use('/v1/task', taskRoute)

// Home Route
app.get('/', (req, res) => {
    res.send('Hello ToDo APP')
})

//Error handler middleware
app.use((err, req, res, next) => {
    console.log(err)
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})