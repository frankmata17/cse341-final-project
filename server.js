require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const dummyAuth = require('./middlewares/dummyAuth');

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Swagger Setup
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Travel Planner API',
      version: '1.0.0',
      description: 'API for managing travel itineraries',
    },
    servers: [
      {
        url: 'https://cse341-final-project-g1sn.onrender.com',
        // 'http://localhost:3000'
      },
    ],
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
  apis: ['./routes/*.js', './models/*.js'], // files containing Swagger annotations
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use dummyAuth for /trips routes
app.use('/trips', dummyAuth, require('./routes/tripRoutes'));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/trips', tripRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
