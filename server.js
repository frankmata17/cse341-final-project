require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const app = express();
const connectDB = require('./config/db');

// Import required modules for OAuth
const session = require('express-session');
const passport = require('./config/passport');

// Import routes
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const authRoutes = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

// Enable CORS for all routes using the cors middleware
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Backup middleware: explicitly add the CORS header to every response
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Import error handler middleware
const errorHandler = require('./middlewares/errorHandler');

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Set up express-session middleware (required for Passport OAuth)
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_session_secret',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state from the session.
app.use(passport.initialize());
app.use(passport.session());

// Swagger Setup (make sure the servers array uses your deployed URL)
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
      },
    ],
    // url: 'https://cse341-final-project-g1sn.onrender.com',
    components: {
      securitySchemes: {
        // Updated to use "http" instead of "https" for bearer authentication
        githubOAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        githubOAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// OAuth routes for authentication
app.use('/auth', authRoutes);

// Define other routes
app.use('/users', userRoutes);
app.use('/trips', tripRoutes);
app.use('/destinations', destinationRoutes);
app.use('/expenses', expenseRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for unit testing
module.exports = app;
