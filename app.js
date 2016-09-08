var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var I18n = require('i18n-node');
var i18n = new I18n({ directory: __dirname + '/locales/' });
var getCookie = require('./helpers/getCookie');
var dotenv = require('dotenv');
var MobileDetect = require('mobile-detect');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

dotenv.load({ path: '.env' });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.middleware());
// Location Cookie
app.use(function(req, res, next) {
  // Get the location cookie
  var location = getCookie(req, 'location');

  // If location cookie is empty, create it and default to hk
  if(location == '' || location == null) {
    location = 'hk';
    res.cookie('location', location);
  }

  req.location = location;
  next();
});
// Mobile Detection
app.use(function(req, res, next) {
  // Get the mobile detect user agent
  var md = new MobileDetect(req.headers['user-agent']);
  req.isMobile = md.mobile() != null;
  req.isTablet = md.tablet() != null;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// If status code is 404, show 404 Not Found page
app.use(function(err, req, res, next) {
  if(err.status === 404) {
    res.status(404);
    res.render('404/index', {
      message: err.message,
      error: err,
      title: "The Wedding",
      language: req.i18n.language,
      location: req.location,
      i18n: req.t,
      hostPlaceImage: "https://d3oglu70a1k4a5.cloudfront.net/rsvp-1.jpg"
    });
  }
  else
    next(err);
});

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


module.exports = app;
