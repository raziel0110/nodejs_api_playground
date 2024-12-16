import { Sequelize } from "sequelize";
import { User } from "./user";
import { Task } from "./task";

const sequelize = new Sequelize(process.env.DATABASE_URL || "", {
  dialect: "postgres",
  logging: false,
});

const models = {
  User: User.initModel(sequelize),
  Task: Task.initModel(sequelize),
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize, models, User };
