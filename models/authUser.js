// load the mongoose driver
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var AuthUsersSchema = mongoose.Schema({
  username: String,
  password: String,
  is_admin: {type: Boolean, default: false}
});

AuthUsersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('AuthUsers', AuthUsersSchema);
