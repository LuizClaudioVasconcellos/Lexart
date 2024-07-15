import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express, Request, Response } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lexart API',
      version: '1.0.0',
      description: 'API para gerenciamento de produtos',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['src/modules/*/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use('/docs.json', (request: Request, response: Response) => {
    response.setHeader('Content-Type', 'application/json');
    response.send(swaggerSpec);
  });
};

export default swaggerSpec;
