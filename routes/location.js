const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/url").secret;

// Delete a Location using it's ID.
router.delete("/deleteLocation", (req, res) => {
  let email = "";
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    if (user) {
      email = user.email;
    } else return res.json({ error: true });

    User.findOne({ email })
      .then(person => {
        const newLoc = person.locations.filter((loc, locID) => {
          return loc.id != req.body.locID;
        });
        person.locations = newLoc;
        person.save();
        return res.json({ success: true });
      })
      .catch(err => console.log(err));
  });
});

// Get All Locations of the User.
router.post("/getUserLocations", (req, res) => {
  var email = "";
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    if (user) {
      email = user.email;
    }
  });
  User.findOne({ email })
    .then(person => {
      return res.json({ loc: person.locations });
    })
    .catch(err => console.log(err));
});

// Push a Location to the DB.
router.post("/pushLocations", (req, res) => {
  let email = "";
  const label = req.body.label;
  const lat = req.body.markerPosition[0];
  const lng = req.body.markerPosition[1];

  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    if (user) {
      email = user.email;
    }
  });
  User.findOne({ email })
    .then(user => {
      const payload = {
        label,
        lat,
        lng
      };
      user.locations.push(payload);
      user.save();
      console.log(user);
    })
    .catch(err => console.log(err));
});

module.exports = router;
