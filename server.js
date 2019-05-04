const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const db = require("./setup/url").url;

app.use(express.json());
app.use("/auth", require("./routes/authenticate"));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected Succesfully!"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  return res.json({ message: "Hello There 😇." });
});

app.listen(port, () => console.log(`Server at ${port}.`));
