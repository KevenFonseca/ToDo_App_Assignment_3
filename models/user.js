const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    }, 
    createdAt:{
        type: Date,
        default: Date.now
    }
}) 

module.exports = mongoose.model('user', userSchema)