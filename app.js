const express = require('express')
const path = require('path')
const connectDB = require('./config/configdb')
const taskRoute = require('./routes/task.router')
const authRoute = require('./routes/auth.router')
const viewRoute = require('./routes/view.router')
const authenticateToken = require('./authorization/auth.middleware')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// Connect to MongoDB
connectDB()

// configuration
app.set('view engine', 'ejs') // Set EJS as the view engine
app.set('veiws', path.join(__dirname, 'views')) // Set the views directory

// Midleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

// Routes
app.use('/', viewRoute)
app.use('/auth', authRoute)
app.use('/task', authenticateToken, taskRoute)

//Error handler middleware
app.use((err, req, res, next) => {
    console.log(err)
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})