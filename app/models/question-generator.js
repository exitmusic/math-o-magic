function QuestionGenerator() {
  this.timeRemaining;
	this.question;
	this.answer;
}

function generateQuestion() {
	var x = getRandomInt(0, 10)
		, y = getRandomInt(0, 10)
		, answer = x * y;
	
	this.answer = answer;
	return x + " * " + y + " = ?";
}

function getRandomInt(min, max) {  
  return Math.floor(Math.random() * (max - min + 1)) + min;  
}

function getTimeRemaining() {
	return 100;
}

QuestionGenerator.prototype.init = function() {
	this.timeRemaining = getTimeRemaining();
	this.question = generateQuestion();
}

QuestionGenerator.prototype.getQuestion = function() {
  return this.question;
};

module.exports = QuestionGenerator;
