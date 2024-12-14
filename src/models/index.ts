import { Sequelize } from "sequelize";
import { User } from "./user";

const sequelize = new Sequelize(process.env.DATABASE_URL || "", {
  dialect: "postgres",
  logging: false,
});

const models = {
  User: User.initModel(sequelize),
};

export { sequelize, models, User };
