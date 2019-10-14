const mongoose = require('./mongo')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    /* id: {
        type: Number,
        required: true
    }, */
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createTime: {
        type: String
    },
    author: {
        type: String,
        default: "无名"
    }
})

module.exports = mongoose.model("Blog", blogSchema)