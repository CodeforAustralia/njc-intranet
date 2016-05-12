// load all the files that are in this dir
module.exports = function(app){
  require('./document.service')(app);
  require('./documents-index.controller')(app);
  require('./documents-new.controller')(app);
  require('./documents-edit.controller')(app);
  require('./documents-view.controller')(app);
};
