import { DataTypes, Model, Sequelize } from 'sequelize';

export class ProductDeletionLog extends Model {
  public id!: number;
  public productId!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public deletedAt!: Date;
}

export const initProductDeletionLogModel = (sequelize: Sequelize) => {
  ProductDeletionLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    },
    {
      sequelize,
      tableName: 'product_deletion_logs',
      timestamps: false,
    },
  );

  return ProductDeletionLog;
};
