$(document).ready(function() {

  var game = new TriviaGame()
    , scoreboard = new ScoreboardView({model: game});
  //console.log(game.get('socket'));
  //console.log(game.get('sessionId'));
  //console.log(game.get('playerNum'));

});
