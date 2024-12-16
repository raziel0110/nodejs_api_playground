import { Request, Response } from "express";
import { User } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.findAll();

  res.status(200).json(users);
};

module.exports = { createUser, getUsers };

export class registerUser {}
