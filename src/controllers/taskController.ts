import { Request, Response } from "express";
import { Task } from "../models/task";

export const newTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({ task });
  } catch (err) {
    res.status(400).json({ message: "Error creating task" });
  }
};

export const getTasks = async (req: Request, res: Response) => {};
