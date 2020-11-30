const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = require('mongodb').ObjectID;

const schema = new Schema({
    title: String,
    description: String,
    file: String,
    version: String,
    content: String,
    user_id: Number,
    repository: String,
    username: String,

    repository_id: ObjectId,

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