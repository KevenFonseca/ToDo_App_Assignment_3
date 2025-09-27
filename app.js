const express = require('express')
const connectDB = require('./config/configdb')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

// Connect to MongoDB
connectDB()

// Midleware
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello Fellows')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})