module.exports = function(app){
  require('./alert.service')(app);
  require('./category.service')(app);
  require('./client.service')(app);
  require('./email-list.service')(app);
  require('./search.service')(app);
  require('./session.service')(app);
  require('./team.service')(app);
  require('./topic.service')(app);
  require('./filter-tab.directive')(app);
  require('./list-search.directive')(app);
  require('./notices.directive')(app);
};
