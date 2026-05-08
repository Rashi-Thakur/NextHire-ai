import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, _res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
    if (!token) {
      const err = new Error("Unauthorized: Missing token");
      err.statusCode = 401;
      throw err;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      const err = new Error("Unauthorized: User not found");
      err.statusCode = 401;
      throw err;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
