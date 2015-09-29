import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "span",
  updateAnswerForm: false,
  actions: {
    updateAnswerForm() {
      this.set('updateAnswerForm', true);
    },

    update(answer) {
      var params = {
        author: this.get('author'),
        text: this.get('text')
      };
      this.set('updateAnswerForm', false);
      this.sendAction('update', answer, params);
    }
  }
});
