import {Model, DataTypes, Sequelize} from "sequelize";
import { Task } from "./task";

export class Category extends Model {
    public id!: number;
    public name!: string;
    
    static associate(_models: any) {
        Category.hasMany(Task, {foreignKey: "categoryId"});
    }

    public static initModel(sequelize: Sequelize): typeof Category { 
        Category.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
            },
            {
                sequelize,
                modelName: "Category",
            }
        );

        return Category;
    }
}