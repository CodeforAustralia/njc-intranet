module.exports = function(app){
  require('./staff-index.controller')(app);
  require('./staff-new.controller')(app);
  require('./staff-status-update.controller')(app);
  require('./staff-update-modal.controller')(app);
  require('./staff-update.controller')(app);
  require('./staff.service')(app);
};
