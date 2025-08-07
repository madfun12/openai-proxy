const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_TO } =
  process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: parseInt(EMAIL_PORT),
  secure: parseInt(EMAIL_PORT) === 465, // true for 465, false for others
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  const { subject, text } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"OpenAI Proxy" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      subject: subject || "Notification from OpenAI Proxy",
      text: text || "This is a default email notification.",
    });

    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error("Email sending error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
