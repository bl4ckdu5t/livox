const express = require('express');
const dotenv = require('dotenv').config();
const nunjucks = require('express-nunjucks');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const csrf = require('csurf');
const helmet = require('helmet');
const mongoose = require('mongoose');

var app = express();

// Connect DB
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
 name: 'nuga',
 secret: 'somekey',
 maxAge: new Date(Date.now() + 3600000),
 resave: false,
 saveUninitialized: false,
//  store: new RedisStore({
//   host: '127.0.0.1',
//   port: 6379,
//   prefix: 'sess'
//  })
}));
app.use(flash());
app.use(csrf({ cookie: true }));
const staticAssetOptions = {
  maxAge: 86400000,
  setHeaders: (res, path, stat) => {
    res.set('Expires', new Date(Date.now() + 86400000).toUTCString());
  }
};

if (app.get('env') == 'production'){
  app.use(helmet());
}

app.use(express.static(path.join(__dirname, 'public'), staticAssetOptions));

// passport.use(new LocalStrategy((username, password, done) => {
//   Auth.authenticate({email: username, password: password}, (err, user) => {
//     if(err){ console.log(err); } // logs error for debugging purposes
//     if(user.body.error){
//       let error = user.body.error;
//       return done(null, false, { message: error });
//     }
//     app.set('authToken', user.body.data.token);
//     return done(null, user.body.data);
//   });
// }));
//
// passport.serializeUser((user, done) => done(null, user.id) );
// passport.deserializeUser((id, done) => {
//   Business.find(id, (err, user) => {
//     done(err, Object.assign(user.body.data, { token: app.get('authToken') }));
//   });
// });

// Routing
const rootRouter = require('./routes/index');
app.use('/', rootRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

nunjucks.setup({ autoescape: true, watch: true }, app);
nunjucks.ready().then((env) => {
  /**
   * Squash Filter
   * uses a delimeter to join space separated strings
   * and removes quotes
   */
  env.addFilter('squash', (str, delimeter) => {
    return str.replace(' ', delimeter || '').replace(/["']/g, '')
    .toLowerCase();
  });
});

module.exports = app;
