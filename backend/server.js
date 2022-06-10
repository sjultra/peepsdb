const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const connectDB = require('./config/db');
// const constants = require('./utils/constants');
// const helpers = require('./utils/helpers');

// Passport Strategy (Google, GitHub & Microsoft)
require('./passport-setup');

dotenv.config();

// Start app
const app = express();

// Connect Database
connectDB();

// Connect Middleware
app.use(
  express.json({
    extended: false,
  })
);

// Initialize passport
app.use(passport.initialize());

// Init Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/profiles', require('./routes/profilesRoutes'));
app.use('/onboard', require('./routes/onboardRoutes'));

// LOAD BUILD INDEX.JS FILE
const dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

console.log(process.env.NODE_ENV);

// Req Logger
const reqLogger = (req, res, next) => {
  logger(
    `Req from: ${req.connection.remoteAddress} ${req.method} '${
      req.url
    }' ${JSON.stringify(req.params)} ${JSON.stringify(req.body)}`
  );
  next();
};
app.use(reqLogger);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR HANDLERS
// Development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// Production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
