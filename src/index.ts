import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cron from "node-cron";

dotenv.config();

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email details
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.RECIPIENT_EMAIL,
  subject: "🎉Party Dedo Frens!",
  text: "Hey there! This is your scheduled daily reminder email. Have a great day! 🎊",
};

// Function to send email
const sendEmail = async () => {
  console.log("Attempting to send email...");
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

sendEmail();

// Schedule the cron job (Runs every day at 9:00 AM IST)
cron.schedule(
  "0 18 * * *",
  () => {
    console.log("⏳ Sending daily reminder email...");
    sendEmail();
  },
  {
    timezone: "Asia/Kolkata",
  }
);

console.log("⏳ Cron job scheduled. Waiting to send emails...");
