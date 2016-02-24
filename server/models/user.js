var mongoose = require('mongoose');

var Schema = mongoose.Schmea;

var UserSchema = new mongoose.Schema({
	name: String
})

var User = mongoose.model('User', UserSchema);

