import express from "express";
import { newCategory, getCategories } from "../controllers/categoryController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/categories", auth, newCategory);
router.get("/categories", getCategories);

export default router;
