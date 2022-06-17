const express = require("express");

const router = express.Router();

const {
  signin,
  signup,
  getAllEmployees,
  resetPassword,
  fetchEmployee,
  deleteEmployee,
  editEmployee,
  toggleAdmin,
} = require("./../controllers/employeeController.js");
router.get("/all", getAllEmployees);
router.get("/toggleAdmin/:id", toggleAdmin);
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/:id", fetchEmployee);

router.delete("/:id", deleteEmployee);
router.patch("/:id", editEmployee);
module.exports = router;
