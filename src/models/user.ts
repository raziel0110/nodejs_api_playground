import { Model, DataTypes, Sequelize } from "sequelize";
import { Task } from "./task";
import { models } from ".";

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public async getTasks(): Promise<Task[]> {
    const tasks = await Task.findAll({ where: { userId: this.id } });

    return tasks;
  }
  static associate(models: any) {
    User.hasMany(Task, { foreignKey: "userId" });
  }

  public static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "User",
      }
    );

    return User;
  }
}
