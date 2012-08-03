var assert = require('assert')
  , Player = require('../app/models/player');

describe('Player', function() {
  var player;
  
  before(function() {
    player = new Player('1', '1000000', 'fakesessionid', 'fakesocketid');
  });
  
  describe('#constructor', function() {
    it('should have an ID', function() {
      assert.equal(player.id, 1, 'Player ID does not match');
    });
    
    it('should have a score', function() {
      assert.equal(player.score, 1000000, 'Player 1 does not have a million points');
    })
    
    it('should have a session ID', function() {
      assert.equal(player.sessionId, 'fakesessionid', 'Player 1 does not have a session ID');
    })
    
    it('should have a socket ID', function() {
      assert.equal(player.socketId, 'fakesocketid', 'Player 1 does not have a socket ID');
    })
  });
});
