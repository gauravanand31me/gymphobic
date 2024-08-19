var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./postgres/connection.js");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gymRouter = require('./routes/gym');
var slotRouter = require('./routes/slot');
var bookingRouter = require('./routes/booking');
var followRouter = require('./routes/followers');

const PORT = process.env.PORT || 9000;

var app = express();

app.listen(PORT, () => {
  console.log(`App is LIstening Port ${PORT}`);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gym', gymRouter);
app.use('/slot', slotRouter);
app.use('/booking', bookingRouter);
app.use('/follow', followRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
