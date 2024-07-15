import { DataTypes, Model, Sequelize } from 'sequelize';

export class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export const initProductModel = (sequelize: Sequelize) => {
  Product.init(
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    },
    {
      sequelize,
      tableName: 'products',
    },
  );

  return Product;
};
