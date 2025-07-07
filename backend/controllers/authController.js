import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });


    const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{expiresIn: "1d"});



     return res.status(201).json({
      message: 'User Registered',
      token,          
      name: newUser.name, 
      email: newUser.email
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Logged in successfully', token,name:user.name, email:user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  
  res.json({ message: 'Logged out' });
};

export const verifyPassword = async (req, res) => {
  const { email, password } = req.body;
  console.log("Verify password called with", email, password);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid password" });

    res.status(200).json({ success: true, message: "Password verified" });
try {
  const fastapiRes = await fetch("http://localhost:8000/clear-dashboard-data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const fastapiData = await fastapiRes.json();
  console.log("FastAPI response:", fastapiData);

} catch (err) {
  console.error("Failed to clear dashboard data in FastAPI", err);
}

res.status(200).json({ success: true, message: "Password verified and data cleared" });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
