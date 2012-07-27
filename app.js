
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io');

var app = express()
	, server = http.createServer(app)
	, io = io.listen(server);
	

// From http://www.danielbaulig.de/socket-ioexpress/
var parseCookie = require('./utils').parseCookie;

io.set('authorization', function (data, accept) {
  if (data.headers.cookie) {
    data.cookie = parseCookie(data.headers.cookie);
    data.sessionID = data.cookie['express.sid'];
  } else {
  	return accept('No cookie transmitted.', false);
  }
  accept(null, true);
});

io.sockets.on('connection', function (socket) {
	console.log('sessionID: '+socket.handshake.sessionID)
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    //console.log(data);
  });
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'secret', key: 'express.sid'}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
