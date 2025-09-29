const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_DB_URL = process.env.MONGO_DB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URL)
        console.log('MongoDB connected')
    } catch (err) {
        console.log('An erro occured', err)
    }
}

module.exports = connectDB