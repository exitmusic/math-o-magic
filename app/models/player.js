/**
 * Stores the properties associated with a trivia player
 * @constructor
 * @property {Number} id An assigned integer player id
 * @property {Number} score Number of points this player has accumulated
 * @property {String} sessionId The session id of this player
 * @property {String} socketId The socket id of this player
 */
function Player(id, score, sessionId, socketId) {
  this.id = id;
  this.score = score;
  this.sessionId = sessionId;
  this.socketId = socketId;
}

module.exports = Player;
