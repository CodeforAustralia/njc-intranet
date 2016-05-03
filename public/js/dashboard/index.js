module.exports = function(app){
  require('./dashboard.controller')(app);
  require('./dashboard.controller')(app);
  require('./duty-worker.directive')(app);
  require('./news-updates.directive')(app);
  require('./news.service')(app);
  require('./update-in-out-status.directive')(app);
  require('./weather.directive')(app);
  require('./weather.service')(app);
};
