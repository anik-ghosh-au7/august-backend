var User = require("../models/user.model");
var jwt = require("jsonwebtoken");

const user_controller = {
  //
  createUser: async (req, res) => {
    // console.log(req.body);
    if (req.user) {
      return res.redirect("/");
    }

    try {
      let entry = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      });
      entry.save(function (err) {
        if (err) {
          // not acceptable
          res.status(406).send(err.message);
        } else {
          // created
          res.render("login");
        }
      });
    } catch {
      res.status(500).send("Internal error occured");
    }
  },

  login: (req, res) => {
    if (req.user) {
      return res.redirect("/posts/postspage");
    }
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({ username }, (err, data) => {
      if (err) {
        // Internal server error
        res.status(500).send({ msg: "Internal Server Error" });
      } else {
        // OK
        if (data) {
          try {
            if (password === data.password) {
              const accessToken = jwt.sign(
                {
                  name: username,
                  email: data.email,
                  id: data._id,
                },
                "SECRET_KEY"
              );
              res.cookie("awtToken", accessToken);
              res.cookie("user_name", username);
              return res.redirect("/posts/postspage");
            } else {
              res.status(401).send("Unauthorized access");
            }
          } catch (err) {
            console.log(err);
            res.status(400).send("Bad request");
          }
        } else {
          // no data
          res.redirect("/");
        }
      }
    });
  },

  loginPage: (req, res) => {
    if (req.user) {
      return res.redirect("/");
    }
    res.render("login");
  },
  signPage: (req, res) => {
    if (req.user) {
      return res.redirect("/users/loginpage");
    }
    res.render("signUp");
  },

  logout: (req, res) => {
    res.clearCookie("awtToken");
    res.clearCookie("user_name");
    res.redirect("/users/loginpage");
  },
};

module.exports = user_controller;
