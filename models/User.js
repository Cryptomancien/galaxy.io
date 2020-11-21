const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    username: String,
    avatar_url: String,
    provider: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const model = mongoose.model('User', schema)

module.exports = model