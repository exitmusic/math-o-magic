$(document).ready(function() {
  window.ScoreboardView = Backbone.View.extend({
    el: $('player-list'),
    initialize: function() {
      this.model.bind('updateScoreboardEvent', this.updateScoreboard, this);
    },
    updateScoreboard: function(players) {
      var player;
      
      $('#player-list li').remove();
      for (var i=0, length = players.length; i < length; i++) {
        player = players[i];
        
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
