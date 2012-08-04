$(document).ready(function() {
  window.TriviaGame = Backbone.Model.extend({
    defaults: {
      timeLimit: 5
    },
    initialize: function() {
      this.set({
          socket: {}
        , sessionId: ''
        , playerNum: 0
        , currentQA: {}
      });
      this.connect();
      this.bindEvents();
      console.log('wat');
    },
    connect: function() {
      var _this = this
        , socket = {}
        , dev = 'http://localhost'
        , prod = 'http://math-o-magic.nodejitsu.com';
      
      socket = io.connect(dev);
      _this.set({socket: socket});
    },
    bindEvents: function() {
      var _this = this
        , socket;
      
      socket = _this.get('socket');
      socket.on('connect', function() {
        // Store session ID for future use
        socket.on('session', function(session) {
          sessionId = session.id;
          playerNum = session.playerNum
        });

        // A new player has joined the room
        socket.on('player-joined', function(data) {
          $('#num-of-players span.players').html(data.numOfPlayers);
          updateScoreboard(data.players);
        });
        
        // A player has left the room
        socket.on('player-left', function(data) {
          $('#num-of-players span.players').html(data.numOfPlayers);
          updateScoreboard(data.players);
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
          updateScoreboard(players);
        });
      });
    }
  });
  
  function updateScoreboard(players) {
    var player;
    
    $('#player-list li').remove();
    for (var i=0, length = players.length; i < length; i++) {
      player = players[i];
      
      $('#player-list').append(
          '<li>'+
            '<div class="row">' +
              '<div class="player span2">Player ' + player.id + '</div>' +
              '<div class="span2">Score: ' + player.score + '</div>' +
            '</div>' +
           '</li>'
      );
    }
  }


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

  
  var game = new TriviaGame;
})
