//$(document).ready(function() {
  window.TriviaGame = Backbone.Model.extend({
    defaults: {
      timeLimit: 5
    },
    initialize: function() {
      this.set({
          socket: io.connect('http://localhost');
        , sessionId: ''
        , playerNum: 0
        , currentQA: {}
      });
    },
    new: function() {
      var _this = this;
      
      $.ajax({
        url: "/new",
        type: "POST",
        success: function(response) {
          var json = $.parseJSON(response);
          
          _this.set({lost: false});
          _this.set({win: false});
          _this.trigger("gameStartedEvent", json);
        }
      })
    },
  })
//})
