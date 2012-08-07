$(document).ready(function() {
  window.PlayerScoreView = Backbone.View.extend({
    el: $('#score'),
    initialize: function() {
      this.model.bind('updatePlayerScoreEvent', this.updatePlayerScore, this);
    },
    updatePlayerScore: function(points) {
      var currentScore = this.$el.find('span.player-score')
        , newScore = parseInt(currentScore.text(), 10) + points;
      
      this.$el.find($('span.player-score')).html(newScore);
    }
  });
});
