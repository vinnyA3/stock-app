var User = require('../models/User'),
	Stock = require('../models/Stocks'),
	config = require('../../config/config'),
	jwt = require('jwt-simple'),
	moment = require('moment');
	
module.exports = function(app,express){
	
	//create our router object
	var router = express.Router();
	
	// =======================  CREATE TOKEN FUNCTION   ===============================
	function createToken(user){
		var payload = {
			sub: user._id,
			iat: moment.unix(),
			exp: moment().add(14,'days').unix
		}
		return jwt.encode(payload, config.secret);
	};
	// =======================  AUTHENTICATION MIDDLEWARE  ============================
    function ensureAuthenticated(req, res, next) {
          if (!req.headers.authorization) {
            return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
          }
          var token = req.headers.authorization.split(' ')[1];

          var payload = null;
          try {
            payload = jwt.decode(token, config.secret);
          }
          catch (err) {
            return res.status(401).send({ message: err.message });
          }

          if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Token has expired' });
          }
          req.user = payload.sub;
          next();
    };
	// =======================  ROUTES FOR SIGNUP AND LOGIN ===========================
	router.post('/signup', function(req,res){
		//create a new user object
		var newUser = new User();
			console.log(req.body);
			newUser.name = req.body.name;
			newUser.email = req.body.email;
			newUser.password = newUser.hashPassword(req.body.password); 
		
		newUser.save(function(err,user){
			if(err){
				//if we have a duplicate entry, return an error
				if(err.code == 11000){
					return res.send({success:false, message: 'A user with that name already exists!'});
				}else{
					res.send(err);
				}
			}
			//if all is well, we want to send a token for the user to use
			return res.send({success:true, token: createToken(user), user:user});
		});
	});
	// =======================  AUTHENTICATED ROUTES  =================================
	router.get('/portfolio', ensureAuthenticated, function(req,res){
		User.find({'_id':req.user}, function(err,user){
				if(err){return res.send(err);}
			    return res.send({success:true, user:user});
			  });
	})
	.post('/portfolio', ensureAuthenticated, function(req,res){
		//create the stock body
		var newStock = new Stock();
		newStock.name = req.body.stockname;
		newStock.symbol = req.body.symbol;
		newStock.created_by = req.user; //user id
		//save the stock	
		newStock.save(function(err){
			if(err){
				return res.send(err);
			}
			return res.send({success:true,message:'stock added!'});
		});
				
	});
	
	//return the express router
	return router;
	
};//end module exports