var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')


//game process
var routes = require('./routes/index');

var users = require('./routes/users');

//sign in 
var login = require('./routes/login');
var register = require('./routes/register');



// management
var userManagement = require('./routes/management/user');
var itemManagement = require('./routes/management/item');
var blueprintManagement = require('./routes/management/blueprint');
var storyManagement = require('./routes/management/story');
var pageManagement = require('./routes/management/page');
var progressManagement = require('./routes/management/progress');
var dbcreate = require('./routes/management/dbcreate');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('html',require("ejs").__express);
app.set('view engine','html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	cookie: { maxAge: 600000 },
	secret: 'Cindy',
	resave: false,
	saveUninitialized: true
}));


//routes
app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/register', register);
app.use('/register/check',register);
app.use('/logout', routes);
app.use('/home', routes);




//user management
app.use('/management/user',userManagement);
app.use('/management/delete',userManagement);
//app.use('/management/update',userManagement);
//item management
app.use('/management/item',itemManagement);
//blueprint management
app.use('/management/blueprint',blueprintManagement);
//story management
app.use('/management/story',storyManagement);
//page management
app.use('/management/page',pageManagement);
//progress management
app.use('/management/progress',progressManagement);

//create db
app.use('/management/dbcreate',dbcreate);

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


module.exports = app;