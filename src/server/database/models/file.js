const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    fieldname: {
        type: String,
        required: true,
    },
    originalname: {
        type: String,
        required: true,
    },
    encoding: {
        type: String,
    },
    mimetype: {
        type: String,
    },
    destination: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: String,
    },
    byUser: {
        type: String,
        required: true,
    },
    qGenerated: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const fileModel = mongoose.model('UploadFile', fileSchema);

module.exports = fileModel;