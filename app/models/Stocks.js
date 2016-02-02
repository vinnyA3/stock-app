var mongoose = require('mongoose');

var StocksSchema = mongoose.Schema({
	name: String,
	symbol: String,
	created_by: {type: mongoose.Schema.Object.Id, ref:'User'}
});