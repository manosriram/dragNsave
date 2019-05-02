const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Hello There 😇." });
});

app.listen(port, () => console.log(`Server at ${port}.`));
