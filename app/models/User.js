var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	StocksSchema = require('./Stocks');

var UserSchema = mongoose.Schema({
	name:String,
	email: {type: String, index:{unique:true}},
    password: {type: String, select:false},
	stocks:[StocksSchema]
});


UserSchema.methods.hashPassword = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8,null));
};

UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password,this.password);
};

//export the model
module.exports = mongoose.model('User',UserSchema);