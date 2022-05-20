const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true,
    },
    option_a: {
        type: String,
        required: true,
    },
    option_b: {
        type: String,
        required: true,
    },
    option_c: {
        type: String,
        required: true,
    },
    option_d: {
        type: String,
        required: true,
    },
    correct_option: {
        type: String,
        required: true,
    },
    question_set_id: {
        type: String
    },
    isIncluded: {
        type: Boolean,
        required: true
    },
    fromFile: {
        type: String,
        required: true
    },
    byUser: {
        type: String,
        required: true
    }

}, { timestamps: true });

const questionModel = mongoose.model('Questions', questionSchema);

module.exports = questionModel;