const md5 = require("md5");
const UserModel = require("../models/userSchema");
const axios = require('axios');

exports.registerUser = async (req, res) => {
  
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      req.flash("message", "Email address already exists.");
      req.flash("messageType", "danger");
      return res.redirect("/register");
    
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      funds: 0,
      password: req.body.password,
    });
    await user.save();
    req.flash("message", "Your account has been successfully created.");
    req.flash("messageType", "success");
    res.redirect("/login");
    
    }
}


    

// Exchange Controller


// Login Controller
exports.loginUser = (req, res) => {
  UserModel.find({
    email: req.body.email,
    password: md5(req.body.password),
  }).exec(function (error, result) {
    if (result.length > 0) {
      req.session.user_email = result[0].email;
      req.session.user_password = result[0].password;
      res.redirect("/");
    } else {
      req.flash("message", "Your login details is invalid.");
      req.flash("messageType", "danger");
      res.redirect("/login");
    }
  });
};
