const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  locations: [
    {
      label: { type: String },
      lat: {
        type: String
      },
      lng: {
        type: String
      }
    }
  ]
});

module.exports = User = mongoose.model("myUser", UserSchema);
