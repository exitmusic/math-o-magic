$(document).ready ->
  ###
  Displays the time remaining for the current question
  ###
  window.TimerView = Backbone.View.extend(
    el: $('#timer')
    initialize: ->
      @model.bind "timeRemainingEvent", @timeRemaining, this
      
    timeRemaining: (time) ->
      @$el.find($("h2.time-remaining")).html time
  )