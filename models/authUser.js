// load the mongoose driver
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var AuthUsersSchema = mongoose.Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose);

var AuthUsers = mongoose.model('AuthUsers', AuthUsersSchema);

module.exports = AuthUsers;
