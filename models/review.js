const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
    reviewFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    reviewBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
