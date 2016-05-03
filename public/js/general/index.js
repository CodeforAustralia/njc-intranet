module.exports = function(app){
  require('./alert.service')(app);
  require('./auth.service')(app);
  require('./category.service')(app);
  require('./team.service')(app);
  require('./topic.service')(app);
  require('./login.controller')(app);
  require('./filter-tab.directive')(app);
  require('./notices.directive')(app);  
};
