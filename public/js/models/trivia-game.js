// Generated by CoffeeScript 1.3.3
(function() {

  $(document).ready(function() {
    return window.TriviaGame = Backbone.Model.extend({
      initialize: function() {
        this.set({
          socket: {},
          sessionId: '',
          playerNum: 0,
          currentQA: {},
          numOfPlayers: 0
        });
        this.connect();
        return this.bindEvents();
      },
      connect: function() {
        var dev, prod, socket, _this;
        _this = this;
        socket = {};
        dev = 'http://localhost';
        prod = 'http://math-o-magic.nodejitsu.com';
        socket = io.connect(prod);
        return _this.set({
          socket: socket
        });
      },
      bindEvents: function() {
        var socket, _this;
        _this = this;
        socket = _this.get('socket');
        socket.on('connect', function() {
          socket.on('session', function(session) {
            return _this.set({
              sessionId: session.id,
              playerNum: session.playerNum
            });
          });
          socket.on('player-joined', function(data) {
            _this.set({
              numOfPlayers: data.numOfPlayers
            });
            _this.trigger('updatePlayerCountEvent', data.numOfPlayers);
            return _this.trigger('updateScoreboardEvent', data.players);
          });
          socket.on('player-left', function(data) {
            _this.set({
              numOfPlayers: data.numOfPlayers
            });
            _this.trigger('updatePlayerCountEvent', data.numOfPlayers);
            return _this.trigger('updateScoreboardEvent', data.players);
          });
          socket.on('timer', function(time) {
            return _this.trigger('timeRemainingEvent', time);
          });
          socket.on('new-question-handshake', function(data) {
            return socket.emit('new-question-handshake', true);
          });
          socket.on('question', function(questionAnswer) {
            _this.set({
              currentQA: questionAnswer
            });
            return _this.trigger('newQuestionEvent', questionAnswer.question);
          });
          socket.on('answer-reply', function(data) {
            if (data.response) {
              return _this.trigger('updatePlayerScoreEvent', data.qMaster.points);
            }
          });
          return socket.on('update-scores', function(players) {
            return _this.trigger('updateScoreboardEvent', players);
          });
        });
        return $('#answer-submit').submit(function(e) {
          var answer, expectedAnswer;
          e.preventDefault();
          answer = parseInt($('#user-answer').val(), 10);
          expectedAnswer = _this.get('currentQA').answer;
          if (answer === expectedAnswer) {
            socket.emit('answer', answer);
          } else {
            console.log('wrong');
          }
          return $('#user-answer').val('');
        });
      }
    });
  });

}).call(this);
