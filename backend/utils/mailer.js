import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['SMTP_USER', 'SMTP_PASS'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Configure transporter with better error handling
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production'
  }
});

// Enhanced sendMail function
export async function sendMail({ 
  to, 
  subject, 
  text, 
  html, 
  attachments = [] 
}) {
  try {
    const mailOptions = {
      from: `"Click2Biz" <${process.env.SMTP_USER}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      text: text || (html ? undefined : 'No text content provided'),
      html: html || (text ? `<p>${text}</p>` : ''),
      attachments
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', {
      error: error.message,
      recipient: to,
      subject
    });
    throw error; // Re-throw for calling code to handle
  }
}

// Verify connection on startup
transporter.verify()
  .then(() => console.log('✅ SMTP connection verified'))
  .catch(err => {
    console.error('❌ SMTP verification failed:', err);
    process.exit(1); // Exit if SMTP isn't working
  });

export default transporter;