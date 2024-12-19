import { Request, Response } from "express";
import { Category } from "../models/category";

export const newCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({ category });
  } catch (err) {
    res.status(400).json({ message: "Error creating category" });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await Category.findAll();

  res.status(200).json({ categories });
};
