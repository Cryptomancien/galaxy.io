const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
    url: String,
    user_id: Number,
    username: String, // username of the user -> example github.com/me/my-project -> me is the username
    name: String, // name of the repository: example github.com/me/my-project -> my-project is the name
    content: {
        type: Object
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