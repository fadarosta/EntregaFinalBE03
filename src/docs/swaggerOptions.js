// src/docs/swaggerOptions.js
import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Pet Adoption API',
      version: '1.0.0',
      description: 'API para gestión de usuarios, mascotas y adopciones',
    },
    servers: [
      {
        url: 'http://localhost:8080/api',
        description: 'Servidor de desarrollo local',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Aquí leerá los comentarios JSDoc
};

const specs = swaggerJsdoc(options);

export { serve, setup, specs };