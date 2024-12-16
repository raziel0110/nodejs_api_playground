import { Model, DataTypes, Sequelize } from "sequelize";
import { User } from "./user";

export class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: string;
  public userId!: number;

  static associate(models: any) {
    Task.belongsTo(models.User, { foreignKey: "userId" });
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
      },
      {
        sequelize,
        modelName: "Task",
      }
    );
    // Task.belongsTo(User, { foreignKey: "userId" });

    return Task;
  }
}
