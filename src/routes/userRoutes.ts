import express from "express";
import {
  createUser,
  getUsers,
  getUserTasks,
} from "../controllers/userController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/users", auth, createUser);
router.get("/users", auth, getUsers);
router.get("/users/:id/tasks", auth, getUserTasks);

export default router;
