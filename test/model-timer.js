var assert = require('assert')
  , express = require('express')
  , http = require('http')
  , io = require('socket.io')
  , Timer = require('../app/models/timer');

describe('Timer', function() {
  var timer = new Timer(io, 10);;
  
  describe('#constructor', function() {
    it('should set the start time to 10', function() {
      assert.equal(timer.startTime, 10, 'Start time is not equal to 10');
    });
  })
  
  describe('#start()', function() {
    it('should indicate the timer is running', function() {
      timer.start();
      assert.equal(timer.isRunning, true, 'Timer is not running');
    });
    
    it('should indicate the time remaining on the timer', function() {
      timer.start();
      assert(timer.timeRemaining, "Timer does not indicate time remaining");
    });
    
    it('should initialize the timer object with an interval ID', function() {
      timer.start();
      assert(timer.timer, "Timer does not have an interval ID");
    });
    
    it('should emit its time to the trivia-room', function() {
      //TODO: figure out how to test this
    });
  })
  
  describe('#stop()', function() {
    it('should indicate the timer is stopped', function() {
      timer.start();
      assert.equal(timer.isRunning, true, 'Timer is not running');
      timer.stop();
      assert.equal(timer.isRunning, false, 'Timer is still running after calling stop');
    })
  });
})