module.exports = function(app){
  require('./feedback-form.controller')(app);
  require('./feedback.service')(app);
};
