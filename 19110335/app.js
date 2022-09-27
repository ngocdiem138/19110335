const bodyParser = require('body-parser');
const express = require('express');
const AccessDenied = require('./utils/errors/AccessDenied');
const userRoutes = require('./routes');

const app = express();

app.use(bodyParser.json());

// allow cors
app.use((req, res, next) => {
  console.log(`URL: ${req.method}  ${req.url}`);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Max-Age', 3600);
  next();
});

// add router
userRoutes(app);

// handle error controller
app.use((err, req, res, next) => {
  console.log(JSON.stringify({ stack: err.stack, message: err.message }));
  if (res.headerSent) return next(err);
  const errorType = _.get(err, 'constructor.name', 'Error');
  switch (errorType) {
    case AccessDenied.name:
      return res.status(err.status).send(err.message);
    default:
      return res.sendStatus(500);
  }
});

module.exports = app;
