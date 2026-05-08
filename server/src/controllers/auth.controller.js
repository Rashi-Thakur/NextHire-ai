import validator from "validator";
import User from "../models/User.js";
import { signToken } from "../utils/token.js";

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const err = new Error("Name, email, and password are required");
      err.statusCode = 400;
      throw err;
    }
    if (!validator.isEmail(email)) {
      const err = new Error("Invalid email");
      err.statusCode = 400;
      throw err;
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      const err = new Error("Email already exists");
      err.statusCode = 409;
      throw err;
    }
    const user = await User.create({ name, email: email.toLowerCase(), password });
    const token = signToken({ userId: user._id });
    res.status(201).json({ success: true, token, user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = new Error("Email and password are required");
      err.statusCode = 400;
      throw err;
    }
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      throw err;
    }
    const token = signToken({ userId: user._id });
    res.json({ success: true, token, user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
};
