import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
// import AppError from '@shared/errors/AppError';
import AppError from '../../shared/errors/AppError';
import { Sequelize } from 'sequelize';
import { initProductModel } from '../../modules/products/models/productModel';
import { initProductDeletionLogModel } from '../../modules/products/models/productDeletionLogModel';
import { initUserModel } from '../../modules/users/models/userModel';
import { setupSwagger } from '../../config/swagger';
// import { initProductModel } from '@modules/products/models/productModel';
// import { initProductDeletionLogModel } from '@modules/products/models/productDeletionLogModel';
// import { initUserModel } from '@modules/users/models/userModel';
// import { setupSwagger } from '@config/swagger';

const corsOptions = {
  origin: true, // Permitir todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Authorization', 'Content-Type'], // Headers permitidos
  credentials: true, // Permitir credenciais (cookies, cabeçalhos de autenticação, etc.)
  maxAge: 86400, // Tempo máximo em segundos para manter as opções pré-voo (preflight)
};

const expressListEndpoints = require('express-list-endpoints');

const config = require('../../../sequelize-config-cli.js').production;

const sequelize = new Sequelize(config.url, {
  dialect: config.dialect,
  dialectOptions: config.dialectOptions,
});

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use(routes);

initProductModel(sequelize);
initProductDeletionLogModel(sequelize);
initUserModel(sequelize);

const endpoints = expressListEndpoints(app);
console.log(endpoints);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
      details: error.message,
    });
  },
);

setupSwagger(app);

const PORT = process.env.PORT || 3333;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

export default sequelize;
