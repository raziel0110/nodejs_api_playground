import express from "express";
import { newTask } from "../controllers/taskController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/tasks", auth, newTask);

export default router;
