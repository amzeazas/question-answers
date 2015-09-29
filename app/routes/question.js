import Ember from 'ember';

export default Ember.Route.extend({
  updateQuestion: false,
  model(params) {
    return this.store.findRecord('question', params.question_id);
  },

  actions: {
    saveAnswer(params) {
      var newAnswer = this.store.createRecord('answer', params);
      var question = params.question;
      question.get('answers').addObject(newAnswer);
      newAnswer.save().then(function() {
        return question.save();
      });
      this.transitionTo('question', params.question);
    },

    update(answer, params) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          answer.set(key,params[key]);
        }
      });
      answer.save();
      this.transitionTo('question', params.question.id);
    },

    destroyAnswer(answer) {
      answer.destroyRecord().then(function() {
        var question = answer.question;
        question.save();
      });
      this.transitionTo('question', question.question_id);
    },

    update(question, params) {
      Object.keys(params).forEach(function(key) {
        if(params[key] !== undefined) {
          question.set(key, params[key]);
        }
      });
      question.save();
      this.transitionTo('question', params.question.id);
    },

    destroyQuestion(question) {
      question.get('answers').forEach(function(answer) {
        answer.destroyRecord();
      });
      question.destroyRecord();
      this.transitionTo('index');
    }
  }
});
