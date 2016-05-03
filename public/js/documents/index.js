// load all the files that are in this dir
module.exports = function(app){
  require('./document.service');
  require('./documents-index.controller');
  require('./documents-new.controller');
  require('./documents-view.controller');
};
