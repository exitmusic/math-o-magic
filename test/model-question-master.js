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
    it('should return a new question and answer', function() {
      var qaObject;
      
      qaObject = qmaster.getNewQuestion();
      assert(qaObject.question, 'A question is missing');
      assert(qaObject.answer, 'An answer is missing');
      assert(qmaster.question, 'A question is missing');
      assert(qmaster.answer, 'An answer is missing');
    });
    
    it('should set the current QuestionMaster instance with the new Q&A', function() {
      var qaObject;
      
      qaObject = qmaster.getNewQuestion();
      assert.equal(qmaster.question, qaObject.question, 'The instance question does not match the question returned');
      assert.equal(qmaster.answer, qaObject.answer, 'The instance answer does not match the answer returned');
    });
    
    it('should reset the status of the question to "unanswered"', function() {
      var qaObject;
      
      qaObject = qmaster.getNewQuestion();
      assert.equal(qmaster.isAnswered, false , 'The status of the new question is not "unanswered"');
    });
  });
});