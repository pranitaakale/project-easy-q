require('dotenv').config();

module.exports.init = function() {
    const mongoose = require('mongoose');
    mongoose.connect(process.env.DB_URL)
        .then(function() {
            console.log("Mongo Connected.")
        })
        .catch(function() {
            console.log("Error in DB connection.")
        })
}