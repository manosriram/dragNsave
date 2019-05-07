const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/url").secret;

router.post("/getLocations", (req, res) => {
  let email = "";
  const label = req.body.label;
  const lat = req.body.markerPosition[0];
  const lng = req.body.markerPosition[1];
  //   console.log(`Lat : ${lat} ::: Lng : ${lng}`);

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
