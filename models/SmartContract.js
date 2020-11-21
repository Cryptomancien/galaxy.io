const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
    name: String,
    file: String,
    description: String,
    content: String,
    user_id: Number,
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