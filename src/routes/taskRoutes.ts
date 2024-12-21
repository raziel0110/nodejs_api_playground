import express from "express";
import { newTask, getFilterTasks } from "../controllers/taskController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/task", auth, newTask);
router.get("/tasks", auth, getFilterTasks);

export default router;
