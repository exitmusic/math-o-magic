$(document).ready ->
  ###
  Displays the scores of all the players currently in the trivia room
  ###
  window.ScoreboardView = Backbone.View.extend(
    el: $('#num-of-players')
    initialize: ->
      @model.bind "updatePlayerCountEvent", @updatePlayerCount, this
      @model.bind "updateScoreboardEvent", @updateScoreboard, this
      
    updatePlayerCount: (count) ->
      @$el.find($('h2.players')).html count

    updateScoreboard: (players) ->
      #var player;
      
      $('#player-list').find('li').remove()
      i = 0
      length = players.length
      
      while i < length
        player = players[i]
        
        #TODO: template this
        ###
        '<li>'+
          '<div class="row">' +
            '<div class="player span2">Player ' + player.id + '</div>' +
            '<div class="score span1 offset1">' + player.score + '</div>' +
          '</div>' +
        '</li>'
        ###
        $('#player-list').append "<li>" + "<div class=\"row\">" + "<div class=\"player span2\">Player " + player.id + "</div>" + "<div class=\"score span1 offset1\">" + player.score + "</div>" + "</div>" + "</li>"
        i++
  )
