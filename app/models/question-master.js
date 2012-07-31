/**
 * Keeps track of the current question and answer.
 * @constructor
 * @property
 * @property
 * @property
 * @param
 */
function QuestionMaster() {
	this.question;
	this.answer;
	this.points = 100;
	this.isAnswered = false;
}

/**
 * Returns a string containing the current math question
 * @method private generateQuestion
 */
function generateQuestion() {
	var x = getRandomInt(0, 10)
		, y = getRandomInt(0, 10)
		, answer = x * y;
	
	return {
			question: x + " * " + y + " = ?"
		, answer: answer
	};
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

QuestionMaster.prototype.getNewQuestion = function() {
	var newQA = generateQuestion();
	
	this.question = newQA.question;
	this.answer = newQA.answer;
	this.isAnswered = false;
	return newQA;
}

module.exports = QuestionMaster;
