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

export const getUserTasks = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ tasks: await user.getTasks() });
};

module.exports = { createUser, getUsers, getUserTasks };

export class registerUser {}
