import { Request, Response } from "express";
import { Task } from "../models/task";
import { Category } from "../models/category";

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

export const getFilterTasks = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { sort = "createdAt", order = "ASC" } = req.query;

  const category = await Category.findOne({
    where: { name: req.query.category },
  });

  try {
    const tasks = await Task.findAll({
      where: { userId: userId, categoryId: category?.id },
      order: [[sort as string, order as string]],
    });

    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(400).json({ message: "Tasks can not be retrieved." });
  }
};
