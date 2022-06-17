const mongoose = require("mongoose");
const Review = require("./../models/review");
const Employee = require("./../models/employee");
const PendingReview = require("./../models/pendingReviews");
const { findById } = require("./../models/review");
module.exports.addPendingReview = async (req, res) => {
  try {
    // console.log(req.body);
    const { employee, dept } = req.body;
    let employees;

    if (dept !== "All")
      employees = await Employee.find({
        $and: [{ _id: { $ne: employee } }, { dept: dept }],
      });
    else employees = await Employee.find({ _id: { $ne: employee } });
    employees.forEach(async (emp) => {
      const updated = await PendingReview.updateOne(
        { employee: emp._id, reviews: { $ne: employee } },
        { $push: { reviews: employee } }
      );
    });
    res.status(200).json({ message: "added to list of pending reviews" });
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: err.message });
  }
};
module.exports.createReview = async (req, res) => {
  try {
    const { reviewBy, reviewFor, rating, feedback } = req.body;

    const result = await Review.create({
      reviewBy: mongoose.Types.ObjectId(reviewBy),
      reviewFor: mongoose.Types.ObjectId(reviewFor),
      rating,
      feedback,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: err.message });
  }
};
module.exports.removePendingReview = async (req, res) => {
  try {
    const { profileID, id } = req.body;

    let r = await PendingReview.findOneAndUpdate(
      { employee: profileID },
      { $pull: { reviews: id } }
    );

    res.status(200).json({ message: "removed pending review" });
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: err.message });
  }
};

module.exports.editReview = async (req, res) => {
  const { id } = req.params;
  let review = await Review.findById(id);

  review.rating = req.body.rating;
  review.feedback = req.body.feedback;
  await review.save();
  res.status(200).json(review);
};
