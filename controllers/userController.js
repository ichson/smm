const md5 = require("md5");
const UserModel = require("../models/userSchema");

// Register Controller
exports.registerUser = (req, res) => {
  UserModel.find({ email: req.body.email }).exec(function (error, result) {
    if (result.length > 0) {
      req.flash("message", "Email address already exists.");
      req.flash("messageType", "danger");
      res.redirect("/register");
    } else {
      const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        funds: 0,
        password: md5(req.body.password)
       
      });

      user.save(function (err, doc) {
        req.flash("message", "Your account has been successfully created.");
        req.flash("messageType", "success");
        res.redirect("/login");
      });
    }
  });
};
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
