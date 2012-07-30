
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , io = require('socket.io')
  , QuestionGenerator = require('./app/models/question-generator')
  , Timer = require('./app/models/timer');

var app = express()
	, server = http.createServer(app)
	, io = io.listen(server);
	
var timer = new Timer(io, 10)
	, triviaMaster = new QuestionGenerator(io);

// From http://www.danielbaulig.de/socket-ioexpress/
var parseCookie = require('./utils').parseCookie;

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
	// Join a one player room based on the player's session ID
	socket.join(socket.handshake.sessionId); 
	
	// Join the public trivia room
	socket.join('trivia-room');
	
	// Get the current question for the new player
	socket.emit('question', triviaMaster.question); 
	
	// Notify existing players that a new player has joined
	io.sockets.in('trivia-room').emit('player-joined', io.sockets.clients('trivia-room').length);
	
	// Reset the timer for the first player in the trivia room
	if (io.sockets.clients('trivia-room').length === 1) {
		timer.start();
		triviaMaster.getNewQuestion();
	} else if (io.sockets.clients('trivia-room').length === 0) {
		timer.stop();
	}
	
	// Notify existing players that a player has left
	socket.on('disconnect', function(data) {
		io.sockets.in('trivia-room').emit('player-left', io.sockets.clients('trivia-room').length - 1);
	})
	
	// The trivia master is ready to emit a new question
	socket.on('new-question-handshake', function(data) {
		if (!timer.isRunning) { // Only get a new question if time is out
			timer.start();
			socket.emit('question', triviaMaster.getNewQuestion());
		} else { // Get the current active question that still has time remaining
			socket.emit('question', triviaMaster.question);
		}
	});
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

//Routes
//Moved all routes to /controllers

//Bootstrap controllers
var controllers_path = __dirname + '/app/controllers';
var controller_files = fs.readdirSync(controllers_path);
controller_files.forEach(function(file) {
require(controllers_path+'/'+file)(app, io);
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
