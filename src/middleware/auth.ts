import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { AuthRequest } from "../types/types";
import { col } from "sequelize";

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Auth failed" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Auth failed" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;

    const id = decoded["user"]["id"];
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
