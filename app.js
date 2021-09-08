var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser')



var indexRouter = require('./routes/index');
var buyerRouter = require('./routes/buyer');
var sellerRouter = require('./routes/seller');
var cartRouter = require('./routes/cart');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: true}))
// app.use(bodyParser.json())


// 頁面轉跳
app.use('/', indexRouter);
app.use('/buyer', buyerRouter);
app.use('/seller', sellerRouter);
app.use('/cart', cartRouter);
app.use('/login', loginRouter);




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
