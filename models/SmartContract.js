const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
    title: String,
    description: String,
    file: String,
    content: String,
    user_id: Number,
    author: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const model = mongoose.model('SmartContract', schema)

module.exports = model