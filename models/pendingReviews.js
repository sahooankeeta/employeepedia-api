const mongoose = require("mongoose");
const PendingReviewSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const PendingReview = mongoose.model("PendingReview", PendingReviewSchema);
module.exports = PendingReview;
