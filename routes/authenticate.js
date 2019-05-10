const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/url").secret;

router.get("/getUserDetails", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    if (user) {
      return res.json({ email: user.email });
    }
  });
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body.data;

  if (!name || !email || !password) return res.json({ message: "Error." });

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

  if (!email || !password) return res.json({ message: "Error." });

  User.findOne({ email })
    .then(person => {
      if (person) {
        User.findOne({ email })
          .then(user => {
            if (!user) {
              return res.json({ success: false });
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
                      return res.json({ success: true });
                    }
                  );
                }
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      } else {
        return res.json({ error: "User not registered" });
      }
    })
    .catch(err => console.log(err));
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth_t");
  req.logout();
});

router.get("/", (req, res) => {
  return res.json({ message: "Auth Route." });
});

module.exports = router;
