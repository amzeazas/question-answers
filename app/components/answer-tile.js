import Ember from 'ember';

export default Ember.Component.extend({
  updateAnswer: false,
  actions: {
    update(answer, params) {
      this.sendAction('update', answer, params);
    },
  }
});
