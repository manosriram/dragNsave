const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  const { name, email, password } = req.body.data;

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
      return res.json({ success: "User Succesfully Registered" });
    } else {
      return res.json({ error: "User already Registered." });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body.data;

  User.findOne({ email })
    .then(person => {
      if (person) {
        // Login and create session for the user.
      } else {
        return res.json({ error: "User not registered" });
      }
    })
    .catch(err => console.log(err));
});

router.get("/", (req, res) => {
  return res.json({ message: "Auth Route." });
});

module.exports = router;
