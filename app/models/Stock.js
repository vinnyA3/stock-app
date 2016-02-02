var mongoose = require('mongoose');

var StocksSchema = mongoose.Schema({
	name: String,
	symbol: String,
	created_by: {type: mongoose.SchemaTypes.ObjectId}
});

//export the model
module.exports = mongoose.model('Stock',StocksSchema);