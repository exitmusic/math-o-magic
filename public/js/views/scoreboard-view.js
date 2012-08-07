$(document).ready(function() {
  /**
   * Displays the scores of all the players currently in the trivia room
   */
  window.ScoreboardView = Backbone.View.extend({
    el: $('#num-of-players'),
    initialize: function() {
      this.model.bind('updatePlayerCountEvent', this.updatePlayerCount, this);
      this.model.bind('updateScoreboardEvent', this.updateScoreboard, this);
    },
    updatePlayerCount: function(count) {
      this.$el.find($('span.players')).html(count);
    },
    updateScoreboard: function(players) {
      var player;
      
     $('#player-list').find('li').remove();
      for (var i=0, length = players.length; i < length; i++) {
        player = players[i];
        
        //TODO: template this
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
  });
});
