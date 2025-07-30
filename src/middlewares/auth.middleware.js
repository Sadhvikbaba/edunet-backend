import { createResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json(
        createResponse(false, 'Authentication required')
      );
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json(
        createResponse(false, 'Invalid or expired token')
      );
    }
  };

export const validateAuth = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(
      createResponse(false, 'Email and password are required')
    );
  }

  if (password.length < 6) {
    return res.status(400).json(
      createResponse(false, 'Password must be at least 6 characters long')
    );
  }

  next();
};