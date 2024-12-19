import express from "express";
import { newTask, getUserTasks } from "../controllers/taskController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/task", auth, newTask);
router.get("/tasks", auth, getUserTasks);

export default router;
