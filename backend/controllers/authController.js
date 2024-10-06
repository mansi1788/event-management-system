import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

// Register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    // Validations
    if (!name) return res.send({ error: "Name is required" });
    if (!email) return res.send({ error: "Email is required" });
    if (!password) return res.send({ error: "Password is required" });
    if (!phone) return res.send({ error: "Phone number is required" });
    if (!address) return res.send({ error: "Address is required" });

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered. Please log in.",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save new user
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role: role || 0, // Default role is 0 (user), role can be passed for admin or vendor
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// Login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = JWT.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role, // Send back the role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
