const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
    url: String,
    user_id: Number,
    author: String,
    config: {
        type: Map,
        of: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const model = mongoose.model('Repository', schema)

module.exports = model