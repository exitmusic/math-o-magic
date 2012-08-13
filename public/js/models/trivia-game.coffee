$(document).ready ->
  window.TriviaGame = Backbone.Model.extend(
    initialize: ->
      @set
        socket: {}
        sessionId: ''
        playerNum: 0     # Player number of this client
        currentQA: {}    # Current question displayed
        numOfPlayers: 0  # Number of players currently playing

      @connect()
      @bindEvents()

    connect: ->
      _this = this
      socket = {}
      dev = 'http://localhost'
      prod = 'http://math-o-magic.nodejitsu.com'
      
      socket = io.connect(dev)
      _this.set socket: socket

    bindEvents: ->
      _this = this
      socket = _this.get('socket')
      socket.on 'connect', ->
        # Store session ID for future use
        socket.on 'session', (session) ->
          _this.set
            sessionId: session.id
            playerNum: session.playerNum

        # A new player has joined the room
        socket.on 'player-joined', (data) ->
          _this.set numOfPlayers: data.numOfPlayers
          _this.trigger 'updatePlayerCountEvent', data.numOfPlayers
          _this.trigger 'updateScoreboardEvent', data.players
        
        # A player has left the room
        socket.on 'player-left', (data) ->
          _this.set numOfPlayers: data.numOfPlayers
          _this.trigger 'updatePlayerCountEvent', data.numOfPlayers
          _this.trigger 'updateScoreboardEvent', data.players
        
        # Update global timer by seconds
        socket.on 'timer', (time) ->
          _this.trigger 'timeRemainingEvent', time
        
        # Notify the server that the client is ready for a new question
        socket.on 'new-question-handshake', (data) ->
          socket.emit 'new-question-handshake', true
        
        # Get the current question/answer
        socket.on 'question', (questionAnswer) ->
          _this.set currentQA: questionAnswer
          _this.trigger 'newQuestionEvent', questionAnswer.question
        
        # Award points of this user is the first to answer correctly
        socket.on 'answer-reply', (data) ->
          _this.trigger 'updatePlayerScoreEvent', data.qMaster.points if data.response
        
        socket.on 'update-scores', (players) ->
          _this.trigger 'updateScoreboardEvent', players
      
      $('#answer-submit').submit (e) ->
        e.preventDefault() # don't submit until answer is verified on the client
        answer = parseInt($('#user-answer').val(), 10)
        expectedAnswer = _this.get('currentQA').answer
        
        if answer is expectedAnswer
          socket.emit 'answer', answer
        else
          console.log('wrong')
          
        $('#user-answer').val ''
  )

