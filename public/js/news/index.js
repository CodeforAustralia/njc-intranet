module.exports = function(app){
  require('./news.service')(app);
  require('./news-index.controller')(app);
  require('./news-item.controller')(app);
  require('./news-create.controller')(app);
  require('./news-edit.controller')(app);
};
