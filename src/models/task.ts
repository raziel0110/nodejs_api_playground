import { Model, DataTypes, Sequelize } from "sequelize";
import { User } from "./user";
import { Category } from "./category";

export class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: string;
  public userId!: number;

  static associate(_models: any) {
    Task.belongsTo(User, { foreignKey: "userId" });
    Task.belongsTo(Category, {foreignKey: "categoryId"});
  }

  public static initModel(sequelize: Sequelize): typeof Task {
    Task.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [["pending", "in-progress", "completed"]],
          },
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        categoryId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Task",
      }
    );
    return Task;
  }
}
