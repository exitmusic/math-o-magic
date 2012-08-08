$(document).ready ->
  ###
  Displays the individual score for the player in the trivia room
  ###
  window.PlayerScoreView = Backbone.View.extend(
    el: $("#score")
    initialize: ->
      @model.bind "updatePlayerScoreEvent", @updatePlayerScore, this

    updatePlayerScore: (points) ->
      currentScore = @$el.find("h2.player-score")
      newScore = parseInt(currentScore.text(), 10) + points
      @$el.find($("h2.player-score")).html newScore
      @animatePoints points

    animatePoints: (points) ->
      pointsNotify = "<div id=\"points-notify\">+" + points + "</div>"
      @$el.append pointsNotify
      $("#points-notify").animate
        opacity: 0
        top: "-=20"
      , 800, ->
        $(this).remove()
  )
