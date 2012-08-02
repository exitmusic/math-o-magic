/**
 * Stores the properties associated with a trivia player
 * @constructor
 * @property {Number} id The numeric player id 
 * @property {String} sessionId The session id of this player
 * @property {Number} score The number of points this player has
 */
function Player(id, sessionId, score) {
  this.id = id;
  this.sessionId = sessionId;
  this.score = score;
}

module.exports = Player;
