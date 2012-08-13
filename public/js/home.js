// Generated by CoffeeScript 1.3.3
(function() {

  $(document).ready(function() {
    var game, playerScore, question, scoreboard, timer;
    game = new TriviaGame();
    timer = new TimerView({
      model: game
    });
    playerScore = new PlayerScoreView({
      model: game
    });
    scoreboard = new ScoreboardView({
      model: game
    });
    return question = new QuestionView({
      model: game
    });
  });

}).call(this);
