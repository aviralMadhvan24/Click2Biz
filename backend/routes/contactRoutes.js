import express from "express";
import nodemailer from "nodemailer";

import Contact from "../models/Contact.model.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
  const { name, email, phone, businessType, message } = req.body;

 
  const newLead = new Contact({ name, email, phone, businessType, message });
  await newLead.save();


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aviralmadhvan@gmail.com",
      pass: "jlai hbrg mawa phwt",
    },
  });

  const mailOptions = {
    from: "yourgmail@gmail.com",
    to: "yourbizmail@gmail.com",
    subject: "New Inquiry from Click2Biz",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nType: ${businessType}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Inquiry received successfully!" });
    }
  });
});

export default router;
