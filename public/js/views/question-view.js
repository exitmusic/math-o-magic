$(document).ready(function() {
  /**
   * Displays the current trivia question
   */
  window.QuestionView = Backbone.View.extend({
    el: $('#question'),
    initialize: function() {
      this.model.bind('newQuestionEvent', this.newQuestion, this);
    },
    newQuestion: function(question) {
      this.$el.find($('h2')).html(question);
    }
  });
});
