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
  socket.on('player-joined', function(data) {
    $('#num-of-players span.players').html(data.numOfPlayers);
    $('#player-list li').remove();
    
    for (var i=0, length = data.players.length; i < length; i++) {
      var player = data.players[i];
      $('#player-list').append('<li>Player '+player.id+' Score: <span>'+player.score+'</span></li>')
    }
    
    /*for (var i=1; i <= numOfPlayers; i++) {
      $('#player-list').append('<li>Player '+i+'</li>');
    }*/
  });
  
  // A player has left the room
  socket.on('player-left', function(data) {
    $('#num-of-players span.players').html(data.numOfPlayers);
    $('#player-list li').remove();
    
    for (var i=0, length = data.players.length; i < length; i++) {
      var player = data.players[i];
      $('#player-list').append('<li>Player '+player.id+' Score: <span>'+player.score+'</span></li>')
    }
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
  
  // Award points of this user is the first to answer correctly
  socket.on('answer-reply', function(data) {
    if (data.response) {
      var scoreEl = $('#score .player-score');
      var newScore = parseInt(scoreEl.text(), 10) + data.qMaster.points;

      scoreEl.html(newScore);
    }
  });
  
  socket.on('update-scores', function (players) {
    $('#player-list li').remove();
    for (var i=0, length = players.length; i < length; i++) {
      var player = players[i];
      $('#player-list').append('<li>Player '+player.id+' Score: <span>'+player.score+'</span></li>')
    }
  })
});

$(document).ready(function() {
  $('#answer-submit').submit(function(e) {
    e.preventDefault(); // don't submit until answer is verified on the client
    
    var answer = parseInt($('#user-answer').val(), 10);
    
    if (answer === currentQA.answer) {
      socket.emit('answer', playerNum);
    } else {
      console.log('wrong');
    }
    $('#user-answer').val('');
  });
});

})();
