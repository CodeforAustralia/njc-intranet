module.exports = function(app){
  require('./staff-index.controller');
  require('./staff-new.controller');
  require('./staff-status-update.controller');
  require('./staff-update-modal.controller');
  require('./staff-update.controller');
  require('./staff.service');
};
