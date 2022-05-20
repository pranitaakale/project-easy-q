const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const fs = require('fs');

const questFile = './database/models/question.json'
const userModel = require("../database/models/user");
const fileModel = require("../database/models/file");
const questModel = require("../database/models/question")


exports.signUp = function(req, res) {
    var userEmail = req.body.email;
    var userPassword = req.body.password;
    var userCPassword = req.body.cpassword;
    signUpValidation(userEmail, userPassword, userCPassword, (msg) => {
        res.send({ isSignedUp: !msg.isError, alertMsg: msg.errMsg })
    })
}

exports.signIn = function(req, res) {
    var userEmail = req.body.username;
    var userPassword = req.body.password;
    logInValidation(userEmail, userPassword, (message) => {
        var token = null;
        var email = null;
        if (!message.isError) {
            let payload = { subject: req.body._id };
            token = jwt.sign(payload, 'secretKey');
            email = userEmail;
        }
        noQuestFiles(userEmail, (fileList) => {
            res.send({ isLoggedIn: !message.isError, alertMsg: message.msg, getToken: token, getEmail: email, questFiles: fileList })
        });

    })

}

exports.fileUpload = function(req, res) {
    const file = req.file;
    file.byUser = req.body.user;
    file.qGenerated = false;
    fileModel.create(file).then((result) => {
        noQuestFiles(req.body.user, (fileList) => {
                res.send({ fileId: result._id, questFiles: fileList });
            })
            // res.send(result._id);
    });
}

exports.contentToQuestions = function(req, res) {
    const file = req.body.file;
    const user = req.body.user;

    // make an api call here
    // get the response
    // insert into db
    fs.readFile(questFile, 'utf8', function(err, data) {
        if (err) throw err;
        // consider this as an api response
        var quest_arr = JSON.parse(data);
        // insert one-by-one into db
        quest_arr.forEach(ques => {
            ques.fromFile = file;
            ques.byUser = user;
            questModel.create(ques).then((result) => {
                // console.log(result)
            })
        });
    });
    res.json();
}

exports.getQuestions = function(req, res) {
    console.log(req.body)
    questModel.find({ fromFile: req.body.file, byUser: req.body.user }).then((result) => {
        fileModel.findOne({ _id: req.body.file }).then((data) => {
            res.json({ quest_list: result, file_name: data.originalname })
        })
    })

}

function noQuestFiles(uEmail, callback) {
    fileModel.find({ qGenerated: false, byUser: uEmail }).then((result) => {
        // result.forEach((file) => {
        //     callback(file.originalname, file._id)
        // })
        callback(result);
    })
}

function logInValidation(uEmail, uPassword, callback) {
    userModel.findOne({ useremail: uEmail }).
    then((user) => {
        if (user) {
            var passMatch = bcrypt.compareSync(uPassword, user.password);
            if (passMatch) {
                callback({ isError: false, msg: "User Logged In Successfully !" });
            } else {
                callback({ isError: true, msg: "Ivalid pass !" });
            }
        } else {
            callback({ isError: true, msg: "Invalid Credentials !" });
        }
    })
}

function signUpValidation(uEmail, uPassword, uCPassword, callback) {
    if (!uEmail || !uPassword || !uCPassword) {
        callback({ isError: true, errMsg: "Empty Fields !" });
    } else {
        if (uPassword != uCPassword) {
            callback({ isError: true, errMsg: "Passwords Don't Match !" });
        } else {
            userModel.findOne({ useremail: uEmail }).
            then((user) => {
                if (user)
                    callback({ isError: true, errMsg: "User already Exists !" });
                else {
                    insertUser(uEmail, uPassword, (msg) => {
                        if (msg.isSignedUp) {
                            callback({ isError: false, errMsg: "User Signed Up Successfully" });
                        }
                    })
                }
            })
        }
    }
}


function insertUser(uEmail, uPassword, callback) {
    const saltRounds = 10;
    const userPassword = uPassword;
    // const keyPassword = 'try_bcrypt';
    const hashedPassword = bcrypt.hashSync(userPassword, saltRounds);
    // console.log(bcrypt.compareSync(text, hash));
    userModel.create({
        useremail: uEmail,
        password: hashedPassword
    }).then(() => callback({ isSignedUp: true }));
}