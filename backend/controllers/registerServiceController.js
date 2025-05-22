const nodemailer = require("nodemailer");
const Service = require("../models/Service");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendServiceRegistrationEmail = async (req, res) => {
  const { name, email, message } = req.body;
  const { id } = req.params;

  console.log("📩 Service registration data received:", { name, email, message, id });

  try {
    const service = await Service.findById(id);
    if (!service) {
      console.log("❌ Service not found");
      return res.status(404).json({ msg: "Service not found" });
    }

    if (service.maxSpots && service.registrations.length >= service.maxSpots) {
      console.log("❌ Max spots reached");
      return res.status(400).json({ msg: "Service is fully booked" });
    }

    service.registrations.push({ name, email, message });
    await service.save();
    console.log("✅ Registration saved to Service DB");

    // ✅ Admin Email
    console.log("📤 Sending admin email...");
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for registering for ${service.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2c3e50;">Goodwood Community Centre</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for registering for the <strong>${service.name}</strong> service.</p>
          <p>Here are your registration details:</p>
          <ul>
            <li><strong>Day:</strong> ${service.dayOfWeek}</li>
            <li><strong>Time:</strong> ${service.startTime} – ${service.endTime}</li>
            ${service.maxSpots ? `<li><strong>Spots Available:</strong> ${service.maxSpots - service.registrations.length}</li>` : ""}
          </ul>
          <p>If you have any questions, feel free to reply to this email.</p>
          <p style="margin-top: 30px;">Warm regards,<br><strong>Goodwood Community Centre Team</strong></p>
        </div>
      `
    });    
    console.log("✅ Admin email sent");

    // ✅ Confirmation Email to User
    console.log("📤 Sending confirmation to user...");
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for registering for ${service.name}`,
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for registering for <strong>${service.name}</strong>. We'll contact you if further details are needed.</p>
        <p>– Goodwood Community Centre</p>
      `,
    });
    console.log("✅ User confirmation email sent");

    res.status(200).json({ msg: "Service registration complete" });
  } catch (err) {
    console.error("❌ Service registration error:", err);
    res.status(500).json({ msg: "Failed to register for service", error: err.message });
  }
};
