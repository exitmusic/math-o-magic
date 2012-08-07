$(document).ready(function() {
  window.TimerView = Backbone.View.extend({
    el: $('#timer'),
    initialize: function() {
      this.model.bind('timeRemainingEvent', this.timeRemaining, this);
    },
    timeRemaining: function(time) {
      this.$el.find($('span.time-remaining')).html(time);
    }
  });
});
