const express = require('express');
const path = require('path');
const createHttpErrors = require('http-errors');
const apiRouter = require('./routers/api');

// The web server
const app = express();

// To handle body
app.use(express.json());

// Web Server
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// 404 Handler
app.use((req, res, next) => {
  next(
    createHttpErrors(404, `Unknown Resource ${req.method} ${req.originalUrl}`),
  );
});

// Error Handler
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(error.status || 500).json({
    error: error.message || `Unknown Error!`,
  });
});

// Listen to port 8000
app.listen(8000, function () {
  console.log('App listening on port 8000');
});
