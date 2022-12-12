const mongoose = require('mongoose');

const users = new mongoose.Schema({
    username: { type: String, required: true },
    password: String,
    emailorphone: String,
    name: String,
    followers: Array,
    followings: Array,
    account_type: String,
    notification: Array,
    post: Array,
    saved: Array,
    tagged: Array,
    pendingRequests: Array,
    bio: String,
    email: String,
    gender: String,
    profileimg: String
})
module.exports = mongoose.model("users", users);