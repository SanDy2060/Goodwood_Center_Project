const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { email, name, phone, subject, message } = req.body;

  if (!email || !name || !phone || !subject) {
    return res.status(400).json({ msg: "Please fill all required fields." });
  }

  try {
    // configure transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or "Outlook", "Yahoo", etc
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // your Gmail app password
      },
    });

    const mailOptions = {
      from: email,
      to: "goodwoodcc0@gmail.com", // 💡 Replace with actual Goodwood Community email
      subject: `Contact Form: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "No message provided."}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: "Message sent successfully!" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ msg: "Failed to send message", error: err.message });
  }
});

module.exports = router;