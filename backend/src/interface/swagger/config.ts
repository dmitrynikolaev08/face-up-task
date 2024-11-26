import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Face Up Task API',
      version: '1.0.0',
      description: 'API documentation for Face Up Task',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/interface/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);