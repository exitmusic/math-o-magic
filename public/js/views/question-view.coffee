$(document).ready ->
  ###
  Displays the current trivia question
  ###
  window.QuestionView = Backbone.View.extend(
    el: $("#question")
    initialize: ->
      @model.bind "newQuestionEvent", @newQuestion, this

    newQuestion: (question) ->
      @$el.find($("h2")).html question
  )
