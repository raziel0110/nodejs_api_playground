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

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await Task.findAll();

  res.status(200).json({ tasks });
};

export const getUserTasks = async (req: Request, res: Response) => {
  console.log(req.params);
  const userId = req.params.userId;
};
