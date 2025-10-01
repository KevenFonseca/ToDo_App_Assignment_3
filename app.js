const express = require('express')
const connectDB = require('./config/configdb')
const taskRoute = require('./routes/task.router')
const authRoute = require('./routes/auth.router')
const authenticateToken = require('./authorization/auth.middleware')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// Connect to MongoDB
connectDB()

// Midleware
app.use(express.json())
// app.use(express.static('public'))

// Routes
app.use('/auth', authRoute)
app.use('/v1/task', authenticateToken, taskRoute)

// Home Route
app.get('/', (req, res) => {
    res.send('Hello ToDo APP')
})

//Error handler middleware
app.use((err, req, res, next) => {
    console.log(err)
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})