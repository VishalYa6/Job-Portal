import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try{
    const { name, email, role, companyName, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(400).json({ message: "User already exists" });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      role, 
      companyName,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req, res) => {
  try{
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Compare password    const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(200).json({ message: "Login successful" , user, token});
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  } 
};