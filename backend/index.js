const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ msg: "yoo from server" });
});

app.listen(3000, () => {
  console.log("server has started at http://localhost:3000");
});
