const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const AppError = require('./utils/customError');
const globalErrorHandler = require('./middleware/errorHandler');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 2) ROUTES
app.use('/api', routes);

// Handle unhandled routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 3) GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
