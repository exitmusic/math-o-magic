/**
 * Keeps track of the current question and answer.
 * @constructor
 */
function QuestionGenerator() {
	this.question;
	this.answer;
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
	this.question = generateQuestion();
}

module.exports = QuestionGenerator;
