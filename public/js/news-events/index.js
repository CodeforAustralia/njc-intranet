module.exports = function(app){
  require('./news-events.service')(app);
  require('./news-events-index.controller')(app);
  require('./news-events-item.controller')(app);
  require('./news-events-create.controller')(app);
  require('./news-events-edit.controller')(app);
};
