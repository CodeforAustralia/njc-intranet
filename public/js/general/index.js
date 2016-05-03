module.exports = function(app){
  require('./login.controller');
  require('./filter-tab.directive');
  require('./notices.directive');
  require('./auth.service');
  require('./alert.service');
  require('./category.service');
  require('./team.service');
  require('./topic.service');
};
