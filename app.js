const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('etl:server');
const cors = require('cors')

const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/apiRouter');
const postRouter = require('./routes/postRouter');

const { PythonShell } = require('python-shell');
const { spawn } = require('child_process');

require('dotenv').config();

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  debug("we are connected");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('*', postRouter);

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use('/parse-py', function(req, res, next) {
  

  PythonShell.runString('x=1+1;print(x)', null, function (err, results) {
    if (err) throw err;
    console.log('finished with data: ' + results);
  });

  next();
});

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
