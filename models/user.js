const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    createdAt:{
        type: Date,
        default: Date.now
    }
}) 

// Before saving, encrypt the password
userSchema.pre('save',
    async function(next){
        if (!this.isModified('password')) return (next)
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
        next()
    }
)

// Compare password
userSchema.methods.isPasswordValid = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('user', userSchema)
