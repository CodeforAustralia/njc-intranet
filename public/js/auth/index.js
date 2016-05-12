module.exports = function(app){
  require('./auth.service')(app);
  require('./login.controller')(app);
  require('./logout.controller')(app);
};
