const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("./../utils/nodemailer");
const Employee = require("./../models/employee");
const PendingReview = require("./../models/pendingReviews");
const Review = require("./../models/review");
const secret = "test";

module.exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldEmployee = await Employee.findOne({ email });

    if (!oldEmployee)
      return res.status(200).json({ error: "Employee doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      oldEmployee.password
    );

    if (!isPasswordCorrect)
      return res.status(200).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { email: oldEmployee.email, id: oldEmployee._id },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: oldEmployee, token });
  } catch (err) {
    return res.status(200).json({ error: "Something went wrong" });
  }
};

module.exports.signup = async (req, res) => {
  const { email, password, name, role, dept, sex } = req.body;

  try {
    const oldEmployee = await Employee.findOne({ email });

    if (oldEmployee)
      return res.status(200).json({ error: "Employee already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Employee.create({
      email,
      password: hashedPassword,
      name,
      role,
      dept,
      sex,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: error.message });
  }
};
module.exports.fetchEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);

    if (employee) {
      let pendingReviews = await PendingReview.find({ employee: id });
      pendingReviews = pendingReviews[0].reviews;
      const allPendingReviews = await Employee.find({
        _id: { $in: pendingReviews },
      });
      const reviews = await Review.find({ reviewFor: id }).populate("reviewBy");

      res.status(200).json({ employee: employee, allPendingReviews, reviews });
    } else res.status(200).json({ error: "Employee not found" });
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};
module.exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    await Review.deleteMany({ reviewFor: id });
    await PendingReview.deleteMany({ employee: id });
    res.status(200).json({ message: "deletion successful" });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};
module.exports.editEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const { name, role, email, dept, sex } = req.body;
    let old = await Employee.findById(id);

    old.name = name;
    old.role = role;
    old.dept = dept;
    old.email = email;
    old.sex = sex;
    await old.save();

    res.status(200).json(old);
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};
module.exports.toggleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    let employee = await Employee.findById(id);
    employee.isAdmin = !employee.isAdmin;
    await employee.save();
    res.status(200).json({ message: "toggled" });
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};
