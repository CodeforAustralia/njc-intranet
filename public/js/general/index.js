module.exports = function(app){
  require('./news-events-create.controller')(app);
  require('./duty-worker.directive')(app);
  require('./duty-worker-card.directive')(app);
  require('./global-header.directive')(app);
  require('./alert.service')(app);
  require('./categories.service')(app);
  require('./client.service')(app);
  require('./email-list.service')(app);
  require('./http-interceptor.service')(app);
  require('./news-events.service')(app);
  require('./search.service')(app);
  require('./session.service')(app);
  require('./teams.service')(app);
};
