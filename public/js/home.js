(function() {

//TODO: Look into using Express deployment environments to automatically change this
var socket = io.connect('http://localhost');
//var socket = io.connect('http://math-o-magic.nodejitsu.com');

var sessionId
	, playerNum
	, currentQA = {};

//TODO: Backbone.js should have a better way to do this
socket.on('connect', function() {
  // Store session ID for future use
	socket.on('session', function(session) {
		sessionId = session.id;
		playerNum = session.playerNum
	});
	
	// A new player has joined the room
  socket.on('player-joined', function(numOfPlayers) {
    var playerEl = $('li.player.template').clone().removeClass('template').html('Player ' + numOfPlayers);
    
    $('#num-of-players span.players').html(numOfPlayers);
    $('ul.players').append(playerEl);
  });
  
  // A player has left the room
  socket.on('player-left', function(numOfPlayers) {
    $('#num-of-players span.players').html(numOfPlayers);
  });
  
  // Update global timer by seconds
  socket.on('timer', function(msg) {
    $('#timer span.time-remaining').html(msg);
  });
  
  // Notify the server that the client is ready for a new question
  socket.on('new-question-handshake', function(data) {
    socket.emit('new-question-handshake', true);
  });
  
  // Get the current question/answer
  socket.on('question', function(qA) {
    $('#question h2').html(qA.question);
    currentQA = qA;
  });
});

$(document).ready(function() {
	$('#answer-submit').submit(function(e) {
		e.preventDefault();
		console.log(sessionId+":"+playerNum);
		socket.emit('answer', sessionId);
	});
});

})();