/**
 * Timer for trivia questions.
 * @constructor
 * @property {Socket} io Socket.io object from the app server
 * @property {Number} startTime The number of seconds at which the timer starts the countdown
 * @property {Number} timeRemaining The time remaining for the current question
 * @property {intervalID} timer The intervalID used to stop the timer
 * @property {boolean} isRunning Is the timer currently running?
 */
function Timer(io, startTime) {
  this.io = io;
  this.startTime = startTime;
  this.timeRemaining;
  this.timer;
  this.isRunning = false;
}

/**
 * Starts the timer
 * @method start
 */
Timer.prototype.start = function() {
  var timer
    , thisTimer = this;
  
  clearInterval(thisTimer.timer); // clear any previous running timers
  thisTimer.timeRemaining = thisTimer.startTime;
  thisTimer.isRunning = true;
  
  timer = setInterval(function() {
    thisTimer.timeRemaining -= 1;
    
    // Emit the time every second, stop the timer once it reaches zero
    if (thisTimer.timeRemaining === 0) {
      thisTimer.stop();
      thisTimer.timeRemaining = thisTimer.startTime;
      
      // Notifies the clients a new question is ready to be retrieved
      thisTimer.io.sockets.in('trivia-room').emit('new-question-handshake', true);
    }
    
    // Broadcast timer
    thisTimer.io.sockets.in('trivia-room').emit('timer', thisTimer.timeRemaining); 
  }, 1000);
  thisTimer.timer = timer;
}

/**
 * Stops the timer
 * @method stop
 */
Timer.prototype.stop = function() {
  clearInterval(this.timer);
  this.isRunning = false;
}

module.exports = Timer;
