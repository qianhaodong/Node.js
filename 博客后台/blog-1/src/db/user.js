const mongoose = require("./mongo")

const Schema = mongoose.Schema

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)