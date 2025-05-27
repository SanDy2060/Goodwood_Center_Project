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

    // Check if max spots are filled
    if (service.maxSpots && service.registrations.length >= service.maxSpots) {
      console.log("❌ Max spots reached");
      return res.status(400).json({ msg: "Service is fully booked" });
    }

    // Push new registration
    service.registrations.push({ name, email, message });
    await service.save();
    console.log("✅ Registration saved to Service DB");

    const spotsLeft = service.maxSpots ? service.maxSpots - service.registrations.length : "N/A";

    // ✅ Email to Admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Registration for ${service.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>New Service Registration Received</h3>
          <p><strong>Service:</strong> ${service.name}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
          <p><strong>Day:</strong> ${service.dayOfWeek}</p>
          <p><strong>Time:</strong> ${service.startTime} – ${service.endTime}</p>
          ${service.price ? `<p><strong>Price:</strong> $${service.price}</p>` : ""}
          ${service.maxSpots ? `<p><strong>Spots Remaining:</strong> ${spotsLeft}</p>` : ""}
        </div>
      `,
    });
    console.log("✅ Admin email sent");

    // ✅ Confirmation Email to User
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for registering for ${service.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for registering for the <strong>${service.name}</strong> service at Goodwood Community Centre.</p>
          <p>Here are your booking details:</p>
          <ul>
            <li><strong>Day:</strong> ${service.dayOfWeek}</li>
            <li><strong>Time:</strong> ${service.startTime} – ${service.endTime}</li>
            ${service.price ? `<li><strong>Price:</strong> $${service.price}</li>` : ""}
            ${service.maxSpots ? `<li><strong>Spots Remaining:</strong> ${spotsLeft}</li>` : ""}
          </ul>
          <p>We look forward to seeing you!</p>
          <p>— Goodwood Community Centre</p>
        </div>
      `,
    });
    console.log("✅ User confirmation email sent");

    res.status(200).json({ msg: "Service registration complete" });
  } catch (err) {
    console.error("❌ Service registration error:", err);
    res.status(500).json({ msg: "Failed to register for service", error: err.message });
  }
};
