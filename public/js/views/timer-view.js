// Generated by CoffeeScript 1.3.3
(function() {

  $(document).ready(function() {
    /*
      Displays the time remaining for the current question
    */
    return window.TimerView = Backbone.View.extend({
      el: $('#timer'),
      initialize: function() {
        return this.model.bind("timeRemainingEvent", this.timeRemaining, this);
      },
      timeRemaining: function(time) {
        return this.$el.find($("h2.time-remaining")).html(time);
      }
    });
  });

}).call(this);
