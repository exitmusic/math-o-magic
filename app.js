
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , io = require('socket.io')
  , _ = require('underscore')
  , QuestionMaster = require('./app/models/question-master')
  , Timer = require('./app/models/timer')
  , Player = require('./app/models/player');

// Server related vars
var app = express()
  , server = http.createServer(app)
  , io = io.listen(server);
  
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

// Trivia room related vars
var timer = new Timer(io, 5)
  , qMaster = new QuestionMaster()
  , players = [];

io.sockets.on('connection', function (socket) {
  var sessId = socket.handshake.sessionId
    , numOfPlayers
    , playerExists
    , newPlayer
    , tempPlayer
    , playerId = 1;
  
  /**
   *  Join a private room based on the player's session ID
   *  A session id spans multiple browser windows.
   */
  socket.join(sessId);
  
  // Join a private room based on the player's socket ID
  socket.join(socket.id);
  
  // Join the public trivia room
  socket.join('trivia-room');
  numOfPlayers = io.sockets.clients('trivia-room').length;
  
  // Get the next available player id
  if (players.length !== 0) {
    tempPlayer = _.max(players, function(player) {
      return player.id;
    });
    playerId = tempPlayer.id + 1;
  }
  
  // Every socket (including multiple browser tabs) will be a new player
  newPlayer = new Player(playerId, 0, sessId, socket.id);
  players.push(newPlayer);
  
  // Emit session id and player number to client for future use
  io.sockets.in(sessId).emit('session', {
      id: sessId
    , playerNum: playerId
  });
  
  // Get the current question for the new player
  socket.emit('question', qMaster); 
  
  // Notify existing players that a new player has joined
  io.sockets.in('trivia-room').emit('player-joined', {
      numOfPlayers: numOfPlayers
    , players: players
  });
  
  // Reset the timer for the first player in the trivia room
  if (io.sockets.clients('trivia-room').length === 1) {
    timer.start();
    qMaster.getNewQuestion();
  } else if (io.sockets.clients('trivia-room').length === 0) {
    timer.stop();
  }
  
  // Notify existing players that a player has left
  socket.on('disconnect', function(data) {
    // Remove disconnected player from players array
    players = _.reject(players, function(player) {
      return player.socketId === socket.id;
    });
    
    io.sockets.in('trivia-room').emit('player-left', {
        numOfPlayers: players.length
      , players: players
    })
  })
  
  // The trivia master is ready to emit a new question
  socket.on('new-question-handshake', function(data) {
    if (!timer.isRunning) { // Only get a new question if time is out
      timer.start();
      socket.emit('question', qMaster.getNewQuestion());
    } else { // Get the current active question that still has time remaining
      socket.emit('question', qMaster);
    }
  });
  
  /**
   * Listens for answers from the clients. Correctness is validated on the client so
   * the answer is assumed to be correct at this point.
   */
  socket.on('answer', function(data) {
    // Only award points if the question has not already been answered by another player
    if (qMaster.isAnswered) {
      io.sockets.in(socket.id).emit('answer-reply', {response: false, qMaster: qMaster});
    } else {
      qMaster.isAnswered = true;
      io.sockets.in(socket.id).emit('answer-reply', {response: true, qMaster: qMaster});
      
      // Update player score
      _.map(players, function(player) {
        if (player.socketId === socket.id) {
          return player.score += qMaster.points;
        } else {
          return player;
        }
      });
    }
    io.sockets.in('trivia-room').emit('update-scores', players)
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
  app.use(require('connect-less')({ src: __dirname + '/public/', compress: true })); // Less compiler
  app.use(require('connect-assets')({src: 'public'})); // CoffeeScript compiler
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
