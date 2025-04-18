const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Travel Planner API',
      version: '1.0.0',
      description: 'API documentation for the Travel Planner project',
    },
    servers: [
      {
        url: 'https://cse341-final-project-g1sn.onrender.com',
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
