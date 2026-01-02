const nodemailer = require("nodemailer");
require("dotenv").config();

async function testEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "mgrant099@gmail.com",
      subject: "Test Email",
      html: "<p>This is a test</p>",
    });
    console.log("Email sent!");
  } catch (err) {
    console.error("Email send failed:", err);
  }
}

testEmail();
