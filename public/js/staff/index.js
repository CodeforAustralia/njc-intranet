module.exports = function(app){
  require('./staff-index.controller')(app);
  require('./staff-create.controller')(app);
  require('./staff-edit-status.controller')(app);
  require('./staff-edit-modal.controller')(app);
  require('./staff-edit.controller')(app);
  require('./staff.service')(app);
};
