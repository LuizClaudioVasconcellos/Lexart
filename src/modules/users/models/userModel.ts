import { DataTypes, Model, Sequelize } from 'sequelize';

export enum UserRole {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: UserRole;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export const initUserModel = (sequelize: Sequelize) => {
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
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(UserRole.INTERNAL, UserRole.EXTERNAL),
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
      tableName: 'users',
    },
  );

  return User;
};
