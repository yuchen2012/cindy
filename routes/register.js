var express = require('express');
var router = express.Router();
var db = require('./db/db');

router.route('/')
.get(function(req, res, next) {
	res.render('register',{title:'Sign up'});

})
.post(function(req,res){
	if(req.body.password1!=req.body.password2){
		console.log('passwords are not the same!');
		res.redirect('/register?p=0');

	}else{
		db.connect();
		/*
		need check user existence here!!!!!
		*/
		db.addUser([req.body.username,req.body.password1]);
	
		db.disconnect();
		res.redirect('/home');
	}
		
});


module.exports = router;
