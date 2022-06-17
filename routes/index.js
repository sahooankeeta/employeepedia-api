const express = require("express");
const router = express.Router();
router.use("/employee", require("./employee"));
router.use("/review", require("./review"));
router.get("/", (req, res) => {
  res.send("landing page");
});
module.exports = router;
