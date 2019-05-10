const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./setup/url").url;
const cookieparser = require("cookie-parser");
const path = require("path");

app.use(express.json());
app.use(cookieparser());
app.use("/auth", require("./routes/authenticate"));
app.use("/loc", require("./routes/location"));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected Succesfully!"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server at ${port}.`));
