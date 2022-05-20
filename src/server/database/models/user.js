const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String
    },
    isVerifiedMail: {
        type: Boolean
    }
}, { timestamps: true });

const userModel = mongoose.model('UserDetail', userSchema);

module.exports = userModel;