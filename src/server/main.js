const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const multer = require('multer');
const path = require('path');
// const mongodb = require('mongodb');
// const jwt = require('jsonwebtoken');
require('dotenv').config();
// var router = express.Router();
//  MIDDLEWARES

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// MULTER
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({
    storage: storage
})

// MONGO
const db_conn = require('./database');
db_conn.init();


// ROUTES
var userController = require('./controller/userRoutes');

app.post(process.env.SIGNUP_ENDPOINT, userController.signUp);

app.post(process.env.SIGNIN_ENDPOINT, userController.signIn);

app.post(process.env.UPLOAD_ENDPOINT, upload.single('pdf'), userController.fileUpload);

app.post(process.env.GENERATE_QUESTIONS, userController.contentToQuestions);

app.post(process.env.GET_QUESTIONS, userController.getQuestions)

app.listen(port, () => console.log('Listening'))