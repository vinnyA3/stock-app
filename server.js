var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	path = require('path'),
	mongoose = require('mongoose'),
	config = require('./config/config'),
	morgan = require('morgan'),
	sass = require('node-sass-middleware'),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	port = process.env.PORT || 8080;

//connect to our database
mongoose.connect(config.db);

//use morgon to log every request
app.use(morgan('dev'));

//body parser middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//CORS for cross browser compatibility
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','GET,POST');
	res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type, \Authorization');
	next();
});
//sass middleware
app.use(
	sass({
		src: __dirname + '/public/sass',
		dest: __dirname + '/public/assets/css',
		prefix: '/css',
		debug:true,
		outputStyle: 'compressed'
	})
);

//set location for static files
app.use(express.static(__dirname + '/public'));

//get all route
app.get('*', function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

server.listen(port, function(){
	console.log('Server listening on port: ' +  port + ' ...');
});


