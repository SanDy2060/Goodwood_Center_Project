const nodemailer = require("nodemailer");
const Registration = require("../models/Registration"); // ✅ Make sure this matches the file name

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendRegistrationEmail = async (req, res) => {
  const { name, email, message, eventTitle } = req.body;
  console.log("📩 Incoming form data:", { name, email, message, eventTitle });

  try {
    // Save the registration to MongoDB
    const saved = await Registration.create({ name, email, message, eventTitle });
    console.log("✅ Registration saved to DB:", saved);

    // Email to Admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Registration for ${eventTitle}`,
      html: `
        <h3>New Registration</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Event:</strong> ${eventTitle}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `,
    });

    // Confirmation Email to User
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for registering for ${eventTitle}`,
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for registering for <strong>${eventTitle}</strong>. We’ll be in touch soon!</p>
        <p>– Goodwood Community Centre</p>
      `,
    });

    console.log("✅ Emails sent successfully");
    res.status(200).json({ msg: "Registration complete" });
  } catch (err) {
    console.error("❌ Registration failed:", err);
    res.status(500).json({ msg: "Failed to register" });
  }
};
