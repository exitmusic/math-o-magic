
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

// works
io.configure(function () {
	io.set('authorization', function (data, callback) { // data = handshake data
	  if (data.headers.cookie) {
	    data.cookie = parseCookie(data.headers.cookie);
	    data.sessionId = data.cookie['express.sid'];
	    // Only save the part of the session id accessible by req.sessionID
	    data.sessionId = data.sessionId.split(".")[0].split(":").pop();
	  } else {
	  	return callback('No cookie transmitted.', false);
	  }
	  callback(null, true);
	});
});

io.sockets.on('connection', function (socket) {
	/*console.log('sessionID: '+socket.handshake.sessionID);
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });*/
	socket.emit('news', 'from server')
	socket.on('from client', function (msg) {
		//console.log(msg);
	});
	socket.join(socket.handshake.sessionId);
	socket.join('trivia-room');
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'secret', key: 'express.sid'}));
  app.use(app.router);
  app.use(require('connect-less')({ src: __dirname + '/public/', compress: true }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
	//io.sockets.in(req.sessionID).send('Man, good to see you back!');
	io.sockets.in('trivia-room').send(Object.keys(io.sockets.in('trivia-room').manager));
	var numOfPlayers = Object.keys(io.sockets.in('trivia-room').manager.connected).length;
	res.render('index', { 
			title: 'Express'
		, numOfPlayers: numOfPlayers //TODO: instead of passing as a variable, this should update the view in real time
	});
});

app.post('/start', function(req, res) {
	
})

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
