const mongoose = require("mongoose");

const PendingReview = require("./pendingReviews");
const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    
    sex: String,
    email: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
    },
    dept: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
EmployeeSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      await PendingReview.create({ employee: this._id });
    } catch (err) {
      return next((err.statusCode = 400));
    }
  }
});
const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
