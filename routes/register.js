var express = require('express');
var router = express.Router();
var db = require('../modules/db/db');
db.connect();

router.route('/')
.get(function(req, res) {
	res.render('register',{title:'Sign up'});

})
.post(function(req,res){
	if(req.body.password1!=req.body.password2){
		res.render('register',{title:'Sign up'});

	}else{

		db.addUser([req.body.username,req.body.email,req.body.password1],res,req);	
	}
		
});

router.route('/check/:username').get(function(req,res){

	db.usernameCheck(req.params.username,res);
	
});
	


module.exports = router;
