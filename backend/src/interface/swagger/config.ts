import swaggerJsdoc from 'swagger-jsdoc';
import { writeFileSync } from 'fs';
import { join } from 'path';

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

// Write swagger.json file
const swaggerFile = join(
  __dirname,
  '../../../../frontend/src/api/swagger.json',
);
writeFileSync(swaggerFile, JSON.stringify(specs, null, 2));
