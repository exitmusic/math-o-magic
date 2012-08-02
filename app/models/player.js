/**
 * Stores the properties associated with a trivia player
 * @constructor
 * @property {Number} id The numeric player id 
 * @property {String} sessionId The session id of this player
 * @property {Number} score The number of points this player has
 */
function Player(id, score, sessionId, socketId) {
  this.id = id;
  this.score = score;
  this.sessionId = sessionId;
  this.socketId = socketId;
}

module.exports = Player;
