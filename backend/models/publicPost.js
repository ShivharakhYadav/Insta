const mongoose = require('mongoose');
const publicPost = new mongoose.Schema({
    username: String,
    userid: String,
    postType: {
        type: String,
        required: true
    },
    postLink:String,
    like: Number,
    comments: Array,
    desription: String,
    location: String,
    uploadTime: Number,
})
module.exports = mongoose.model("publicpost", publicPost);