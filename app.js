var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();
var browserify = require('browserify-middleware');
var server = require('http').Server(app);
var expressWs = require('express-ws')(app, server);

app.use(express.static(__dirname + '/public'));

// Sharing von Code im Client und Server mit browserify
app.get('/app.js', browserify('./client/main.js'));

let clients = []
let sockets = []

// websocket connection
app.ws('/ws', function(ws, req) {
  
  // position and direction of client
  let clientdata = {
    dir: new Vector(2,0),
    pos: new Vector(200, 200)
  }
  
  // remember client pos and socket
  clients.push(clientdata)
  sockets.push(ws)

  ws.on('message', function(msg) {
    // TODO Steuerungsnachricht erhalten - Richtung ändern
  
  });

  ws.on('close', function close() {
    clients = clients.filter(i => i !== clientdata)
    sockets = sockets.filter(s => s !== ws)
  });
});

const Vector = require('./lib/Vector.js')

// alle 50 ms ein Update senden
setInterval( () => {

  // TODO alle Spieler bewegen
  clients.forEach( (c) => {
    // TODO
  })

  // TODO alle Spieler mit aktuellen Daten versorgen
  sockets.forEach( (ws) => {
    // TODO
  })
}, 50)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = {app: app,server: server};
