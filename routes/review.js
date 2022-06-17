const express = require("express");

const router = express.Router();

const {
  addPendingReview,
  createReview,
  removePendingReview,
  editReview,
} = require("./../controllers/reviewController");

router.post("/pendingReview", addPendingReview);

router.post("/create", createReview);
router.post("/removePendingReview", removePendingReview);
router.patch("/:id", editReview);
module.exports = router;
