  var compression = require('compression');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

  // Middleware to serve files from within a given root directory
  var serveStatic = require('serve-static');

var app = express();

  var debug = require('debug')('chatbuilder:server');
  var http = require('http');

  var port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  var server = http.createServer(app);

  // We are using socket.io to communicate with client
  var io = require('socket.io')(server);

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

  // We want to include caching of the content with max age the number of milliseconds in one day
  var oneDay = 86400000;

  // We want to make sure our static content is compressed using gzip
  // Use compress middleware that is bundled with Express
  // New call to compress content before any other middlewares
  // Will return elements compressed with gzip if they're HTML, CSS, JS or JSON
  app.use(compression());

  // Add static middleware that handles serving up content from public directory
  // The public directory will be served and any content in it will be available
  // Request the root route '/' and you'll get index.html automatically
  app.use(serveStatic(__dirname + '/public', { maxAge: oneDay }));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
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
