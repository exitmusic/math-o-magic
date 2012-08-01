var assert = require('assert')
  , QuestionMaster = require('../app/models/question-master');

describe('QuestionMaster', function() {
  var qmaster = new QuestionMaster();
  
  describe('#constructor', function() {
    it('should default to 100 points', function() {
      assert.equal(qmaster.points, 100, 'Default points does not equal 100');
    });
    
    it('should not be answered', function() {
      assert.equal(qmaster.isAnswered, false, 'Question should not be answered');
    })
  });
  
  describe('#getNewQuestion', function() {
    it('should generate a new question and answer', function() {
      qmaster.getNewQuestion();
      assert(qmaster.question, 'A question is missing');
      assert(qmaster.answer, 'An answer is missing');
    });
  });
});