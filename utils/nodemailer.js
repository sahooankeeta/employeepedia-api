const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "codingankeeta@gmail.com",
    pass: "dqtiwhcdwbqavbud",
  },
});
module.exports = transporter;
