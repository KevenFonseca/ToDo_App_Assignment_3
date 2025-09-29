const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'deleted'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('task', taskSchema)