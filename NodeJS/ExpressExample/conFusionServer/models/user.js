const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
	// Below commented out will add the passport local mongoose
	/* 	username: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		}, */
	admin: {
		type: Boolean,
		default: false
	}
});

// Using schema and model with passport localmongoose.
// Adding hash storage of password hash and salt.
// additional methods for passport authentication.

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);