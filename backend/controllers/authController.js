import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import admin from 'firebase-admin';


// Proper Firebase Admin initialization with error handling
let firebaseInitialized = false;

const initializeFirebase = () => {
  try {
    if (!admin.apps.length) {
      const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
      });
      firebaseInitialized = true;
      console.log('Firebase Admin initialized successfully');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw new Error('Failed to initialize Firebase Admin');
  }
};

// Initialize immediately when module loads
initializeFirebase();



export const firebaseAuth = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "ID token is required" });
  }

  try {
    // 🔐 1. Verify token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { email, name } = decodedToken;

    // 👤 2. Check if user exists in DB
    let user = await User.findOne({ email });

    // 🆕 3. If not, create the user
    if (!user) {
      user = new User({
        name: name || email.split("@")[0],
        email,
        role: "client", // default role
        provider: "google",
      });

      await user.save();
    }

    // 🔑 4. Generate JWT for session
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 📦 5. Send response
    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });

  } catch (error) {
    console.error("Firebase Auth Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Configure email transporter with better error handling
const createTransporter = () => {
  try {
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'Gmail',
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false // For self-signed certificates
      }
    });
  } catch (error) {
    console.error('Error creating email transporter:', error);
    throw new Error('Email service configuration error');
  }
};

const transporter = createTransporter();

// Verify email configuration on startup
transporter.verify((error) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready to send messages');
  }
});

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role: 'client' 
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

export const verifyPassword = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid password" 
      });
    }

    // Clear dashboard data in FastAPI
    try {
      const fastapiRes = await fetch("http://localhost:8000/clear-dashboard-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!fastapiRes.ok) {
        throw new Error('Failed to clear dashboard data');
      }

      const fastapiData = await fastapiRes.json();
      console.log("FastAPI response:", fastapiData);

      return res.status(200).json({ 
        success: true, 
        message: "Password verified and data cleared" 
      });

    } catch (err) {
      console.error("Failed to clear dashboard data:", err);
      return res.status(200).json({ 
        success: true, 
        message: "Password verified but failed to clear dashboard data" 
      });
    }

  } catch (err) {
    console.error('Password verification error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal whether email exists for security
      return res.json({ message: 'If the email exists, an OTP has been sent' });
    }

    const otp = otpGenerator.generate(6, { 
      upperCase: false, 
      specialChars: false,
      alphabets: false // Numbers only
    });

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    const mailOptions = {
      from: `"Click2Biz" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Password Reset Request</h2>
          <p>Your OTP for password reset is:</p>
          <div style="background: #f3f4f6; padding: 10px; border-radius: 5px; 
              font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent to your email' });

  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ 
      message: 'Failed to process request',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });

  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({ 
      message: 'Failed to reset password',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};