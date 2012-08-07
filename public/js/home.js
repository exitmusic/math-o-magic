$(document).ready(function() {

  var game = new TriviaGame()
    , timer = new TimerView({model: game})
    , playerScore = new PlayerScoreView({model: game})
    , scoreboard = new ScoreboardView({model: game})
    , question = new QuestionView({model: game});

  
});
