import express from "express";
import { createUser, getUsers } from "../controllers/userController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/users", auth, createUser);
router.get("/users", auth, getUsers);

export default router;
