$(document).ready(function() {
  /**
   * Displays the individual score for the player in the trivia room
   */
  window.PlayerScoreView = Backbone.View.extend({
    el: $('#score'),
    initialize: function() {
      this.model.bind('updatePlayerScoreEvent', this.updatePlayerScore, this);
    },
    updatePlayerScore: function(points) {
      var currentScore = this.$el.find('h2.player-score')
        , newScore = parseInt(currentScore.text(), 10) + points;
      
      this.$el.find($('h2.player-score')).html(newScore);
      this.animatePoints(points);
    },
    animatePoints: function(points) {
      var pointsNotify = '<div id="points-notify">+' + points + '</div>';
      
      this.$el.append(pointsNotify);
      $('#points-notify').animate({
          opacity: 0
        , top: '-=20'
      }, 800, function() {
        $(this).remove();
      });
    }
  });
});
