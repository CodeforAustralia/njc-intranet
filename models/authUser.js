// load the mongoose driver
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var AuthUsersSchema = mongoose.Schema({
  username: String,
  password: String
});

AuthUsersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('AuthUsers', AuthUsersSchema);
