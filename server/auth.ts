import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { User } from "@shared/schema";

export interface AuthRequest extends Request {
  user?: User;
}

const getJwtSecret = (): string => {
  return process.env.JWT_SECRET || "development-secret-key-change-in-production";
};

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  const secret = getJwtSecret();

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = decoded as User;
    next();
  });
}

export function generateToken(user: User): string {
  const secret = getJwtSecret();
  return jwt.sign(user, secret, { expiresIn: "7d" });
}
