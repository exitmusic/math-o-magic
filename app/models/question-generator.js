/**
 * Keeps track of the current question and answer.
 * @constructor
 */
function QuestionGenerator() {
  this.timeRemaining; //TODO: time related stuff should be its own object?
	this.question;
	this.answer;
	this.timer; //TODO: time related stuff should be its own object?
}

/**
 * Returns a string containing the current math question
 * @method private generateQuestion
 */
function generateQuestion() {
	var x = getRandomInt(0, 10)
		, y = getRandomInt(0, 10)
		, answer = x * y;
	
	this.answer = answer;
	return x + " * " + y + " = ?";
}

/**
 * Returns a random integer between the min and max
 * @method private getRandomInt
 * @param {Number} min Minimum value the random integer can have
 * @param {Number} max Maximum value the random integer can have
 */
function getRandomInt(min, max) {  
  return Math.floor(Math.random() * (max - min + 1)) + min;  
}

QuestionGenerator.prototype.init = function() {
	this.timeRemaining = 10;
	this.question = generateQuestion();
}

QuestionGenerator.prototype.startTimer = function() {
	var timer
		, thisGenerator = this;
	
	clearInterval(thisGenerator.timer); // clear any previous running timers
	thisGenerator.timeRemaining = 10;
  
	timer = setInterval(function() {
		thisGenerator.timeRemaining -= 1;
  	if (thisGenerator.timeRemaining === 0) {
  		clearInterval(thisGenerator.timer);
  	}
  }, 1000);
  this.timer = timer;
}

QuestionGenerator.prototype.stopTimer = function() {
	clearInterval(this.timer);
}

module.exports = QuestionGenerator;
