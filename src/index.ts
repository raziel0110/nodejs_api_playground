require("dotenv").config();

import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { sequelize } from "./models";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((_req: Request, res: Response, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api", userRoutes);
app.use("/api", taskRoutes);
app.use("/api/auth", authRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Express server listening on port 4000");
  });
});

export default app;
