const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "./config.env") });
const port = process.env.PORT || 8000;
const app = express();
const DB = process.env.DB.replace("<PASSWORD>", process.env.PASSWORD);
//connect mongoose and express
mongoose.connect(DB).then((con) => {
  console.log("connection made to database");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error on running port");
  }
  console.log(`server running on ${port}`);
});
