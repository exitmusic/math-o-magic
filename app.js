
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
var parseCookie = require('./utils').parseCookie
	, MemoryStore = express.session.MemoryStore
	, sessionStore = new MemoryStore()
	, Session = require('connect').middleware.session.Session;

io.set('authorization', function (data, accept) {
  if (data.headers.cookie) {
    data.cookie = parseCookie(data.headers.cookie);
    data.sessionID = data.cookie['express.sid'];
    console.log('1. '+data.sessionID);
    data.sessionStore = sessionStore;
    sessionStore.get(data.sessionID, function (err, session) {
      if (err) {
        accept('Error', false);
      } else {
        data.session = new Session(data, session);
        accept(null, true);
      }
    });
  } else {
     return accept('No cookie transmitted.', false);
  }
});

// works
/*io.set('authorization', function (data, accept) {
  if (data.headers.cookie) {
    data.cookie = parseCookie(data.headers.cookie);
    data.sessionID = data.cookie['express.sid'];
  } else {
  	return accept('No cookie transmitted.', false);
  }
  accept(null, true);
});*/

// fails
/*io.set('authorization', function(data, fn){
  var cookies = parseCookie(data.headers.cookie)
    , sid = cookies['connect.sid'];
  app.store.load(sid, function(err, sess){
    if (err) return fn(err);
    data.session = sess;
    fn(null, true);
  });
});*/

io.sockets.on('connection', function (socket) {
	/*console.log('sessionID: '+socket.handshake.sessionID);
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });*/
	socket.on('message', function (msg) {
		console.log(msg);
	});
	socket.join(socket.handshake.sessionID);
	console.log('2. '+socket.handshake.sessionID);
	//socket.join('trivia-room');
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
  app.use(express.session({store: sessionStore, secret: 'secret', key: 'express.sid'}));
  app.use(app.router);
  app.use(require('connect-less')({ src: __dirname + '/public/', compress: true }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
	res.render('index', { title: 'Express' });
	console.log('3. '+req.sessionID);
	io.sockets.in(req.sessionID).send('Man, good to see you back!');
	//io.sockets.in('trivia-room').send('entered trivia room');
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
