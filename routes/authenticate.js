const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/url").secret;

// Get Complete User Details.
router.get("/getUserDetails", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    if (user) {
      return res.json({ email: user.email });
    }
  });
});

// Register a User and also hash the Password.
router.post("/register", (req, res) => {
  const { name, email, password } = req.body.data;

  const emailRegex = new RegExp("[a-zA-z0-9.-+><_]+@[a-z]+.w*");
  let meA = emailRegex.exec(email);
  if (meA !== null) {
    if (!name || !email || !password)
      return res.json({
        error: true,
        errorMessage: "All Fields must be filled."
      });
    User.findOne({ email }).then(user => {
      if (!user) {
        let newUser = new User({
          name,
          email,
          password
        });
        // hash password using bcrypt.
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save().catch(err => console.log(err));
          });
        });
        return res.json({ success: true });
      } else {
        return res.json({
          error: true,
          errorMessage: "User with same Email is already Registered."
        });
      }
    });
  } else {
    return res.json({ error: true, errorMessage: "Not an Email." });
  }
});

// Create a Session for the User and Login.
router.post("/login", (req, res) => {
  const { email, password } = req.body.data;

  const emailRegex = new RegExp("[a-zA-z0-9.-+><_]+@[a-z]+.w*");
  let meA = emailRegex.exec(email);
  if (meA !== null) {
    if (email === null || password === null)
      return res.json({ error: true, errorMessage: "Fill all the Fields." });

    User.findOne({ email })
      .then(person => {
        if (person) {
          User.findOne({ email })
            .then(user => {
              if (!user) {
                return res.json({
                  error: true,
                  errorMessage: "No User Found with this Email."
                });
              }

              bcrypt
                .compare(password, user.password)
                .then(isCorrect => {
                  if (isCorrect) {
                    var payload = {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    };
                    jsonwt.sign(
                      payload,
                      key,
                      { expiresIn: 9000000 },
                      (err, token) => {
                        res.cookie("auth_t", token, { maxAge: 90000000 });
                        return res.json({
                          success: true,
                          message: "Logged In."
                        });
                      }
                    );
                  } else {
                    return res.json({
                      error: true,
                      errorMessage: "Password Incorrect."
                    });
                  }
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        } else {
          return res.json({
            error: true,
            errorMessage: "User Not Registered."
          });
        }
      })
      .catch(err => console.log(err));
  } else {
    return res.json({ error: true, errorMessage: "Not an Email." });
  }
});

// Destroy the Session and Logout the User.
router.get("/logout", (req, res) => {
  res.clearCookie("auth_t");
  req.logout();
});

module.exports = router;
